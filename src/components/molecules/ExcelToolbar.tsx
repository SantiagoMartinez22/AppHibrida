import { useRef } from 'react'
import { FiDownload, FiUpload } from 'react-icons/fi'
import { toast } from 'sonner'
import { AppButton } from '@/components/atoms/AppButton'
import { useVisitorStore } from '@/store/visitorStore'
import { exportVisitorsToExcel, parseVisitorsExcel } from '@/lib/excel-utils'
import type { VisitorRecord } from '@/types'
import { cn } from '@/lib/utils'

export interface ExcelToolbarProps {
  visitors: VisitorRecord[]
  className?: string
}

export function ExcelToolbar({ visitors, className }: ExcelToolbarProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const importVisitors = useVisitorStore((s) => s.importVisitors)

  const handleExport = () => {
    if (visitors.length === 0) {
      toast.info('No hay visitantes para exportar')
      return
    }
    exportVisitorsToExcel(visitors)
    toast.success(`Exportados ${visitors.length} visitantes`)
  }

  const handleImportClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = () => {
      try {
        const buffer = reader.result as ArrayBuffer
        const records = parseVisitorsExcel(buffer)
        if (records.length === 0) {
          toast.warning('No se encontraron filas válidas (Visitante y Destino requeridos)')
        } else {
          const count = importVisitors(records)
          toast.success(`${count} visitantes importados correctamente`)
        }
      } catch (err) {
        toast.error(err instanceof Error ? err.message : 'Error al importar el archivo')
      }
      e.target.value = ''
    }
    reader.readAsArrayBuffer(file)
  }

  return (
    <div
      className={cn(
        'flex flex-wrap items-center gap-2 rounded-lg border bg-card/50 px-3 py-2',
        className
      )}
    >
      <AppButton
        type="button"
        variant="outline"
        className="w-auto py-2 px-4"
        onClick={handleExport}
      >
        <FiDownload className="h-4 w-4" aria-hidden />
        Exportar Excel
      </AppButton>
      <AppButton
        type="button"
        variant="outline"
        className="w-auto py-2 px-4"
        onClick={handleImportClick}
      >
        <FiUpload className="h-4 w-4" aria-hidden />
        Importar Excel
      </AppButton>
      <input
        ref={fileInputRef}
        type="file"
        accept=".xlsx,.xls"
        className="hidden"
        aria-hidden
        onChange={handleFileChange}
      />
    </div>
  )
}
