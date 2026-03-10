import * as XLSX from 'xlsx'
import type { VisitorRecord } from '@/types'
import { formatDateTime } from './date-utils'

const EXCEL_HEADERS = {
  id: 'ID',
  registeredBy: 'Registrado Por',
  visitorName: 'Visitante',
  destination: 'Destino',
  observation: 'Observación',
  createdAt: 'Fecha Ingreso',
  status: 'Estado',
  checkoutAt: 'Fecha Salida',
} as const

export type VisitorImportRecord = Omit<
  VisitorRecord,
  'id' | 'createdAt' | 'status' | 'checkoutAt'
>

function statusToLabel(status: VisitorRecord['status']): string {
  return status === 'active' ? 'Activo' : 'Departado'
}

export function exportVisitorsToExcel(visitors: VisitorRecord[]): void {
  const rows = visitors.map((v) => ({
    [EXCEL_HEADERS.id]: v.id,
    [EXCEL_HEADERS.registeredBy]: v.registeredBy,
    [EXCEL_HEADERS.visitorName]: v.visitorName,
    [EXCEL_HEADERS.destination]: v.destination,
    [EXCEL_HEADERS.observation]: v.observation ?? '',
    [EXCEL_HEADERS.createdAt]: formatDateTime(v.createdAt),
    [EXCEL_HEADERS.status]: statusToLabel(v.status),
    [EXCEL_HEADERS.checkoutAt]: v.checkoutAt ? formatDateTime(v.checkoutAt) : '',
  }))

  const sheet = XLSX.utils.json_to_sheet(rows)
  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, sheet, 'Visitantes')

  const dateStr = new Date().toISOString().slice(0, 10)
  XLSX.writeFile(workbook, `vigilog-visitantes-${dateStr}.xlsx`)
}

export function parseVisitorsExcel(buffer: ArrayBuffer): VisitorImportRecord[] {
  const workbook = XLSX.read(buffer, { type: 'array' })
  const firstSheetName = workbook.SheetNames[0]
  if (!firstSheetName) {
    throw new Error('El archivo no contiene hojas')
  }

  const sheet = workbook.Sheets[firstSheetName]
  const rawRows = XLSX.utils.sheet_to_json<Record<string, unknown>>(sheet, {
    defval: '',
    raw: false,
  })

  if (rawRows.length === 0) {
    return []
  }

  const headers = Object.keys(rawRows[0] ?? {})
  const hasVisitante = headers.some(
    (h) => h.toLowerCase().includes('visitante') || h === EXCEL_HEADERS.visitorName
  )
  const hasDestino = headers.some(
    (h) => h.toLowerCase().includes('destino') || h === EXCEL_HEADERS.destination
  )

  if (!hasVisitante || !hasDestino) {
    throw new Error(
      'El archivo debe contener las columnas "Visitante" y "Destino"'
    )
  }

  const getCol = (row: Record<string, unknown>, ...names: string[]): string => {
    for (const name of names) {
      const key = Object.keys(row).find(
        (k) => k.toLowerCase() === name.toLowerCase() || k === name
      )
      if (key !== undefined) {
        const val = row[key]
        return typeof val === 'string' ? val.trim() : String(val ?? '').trim()
      }
    }
    return ''
  }

  const result: VisitorImportRecord[] = []

  for (const row of rawRows) {
    const visitorName = getCol(
      row,
      EXCEL_HEADERS.visitorName,
      'Visitante',
      'visitorName'
    )
    const destination = getCol(
      row,
      EXCEL_HEADERS.destination,
      'Destino',
      'destination'
    )

    if (!visitorName || !destination) {
      continue
    }

    const registeredBy = getCol(
      row,
      EXCEL_HEADERS.registeredBy,
      'Registrado Por',
      'registeredBy'
    )
    const observation = getCol(
      row,
      EXCEL_HEADERS.observation,
      'Observación',
      'observation'
    )

    result.push({
      registeredBy: registeredBy || 'admin',
      visitorName,
      destination,
      observation: observation || undefined,
    })
  }

  return result
}
