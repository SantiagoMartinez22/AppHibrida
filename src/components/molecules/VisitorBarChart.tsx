import { useMemo } from 'react'
import type { VisitorRecord } from '@/types'
import { cn } from '@/lib/utils'

export interface VisitorBarChartProps {
  visitors: VisitorRecord[]
  dateRange?: { start: Date; end: Date }
  className?: string
}

interface DayData {
  date: string
  count: number
  dayLabel: string
  dayNumber: number
}

function toLocalDateKey(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export function VisitorBarChart({
  visitors,
  dateRange,
  className,
}: VisitorBarChartProps) {
  const chartData = useMemo(() => {
    const today = new Date()
    const day = today.getDay()
    const mondayOffset = day === 0 ? -6 : 1 - day
    const defaultStart = new Date(today)
    defaultStart.setDate(today.getDate() + mondayOffset)
    defaultStart.setHours(0, 0, 0, 0)
    const defaultEnd = new Date(defaultStart)
    defaultEnd.setDate(defaultStart.getDate() + 6)

    const end = dateRange?.end ?? defaultEnd
    const start = dateRange?.start ?? defaultStart

    const daysMap = new Map<string, number>()
    const current = new Date(start)
    
    while (current <= end) {
      const dateKey = toLocalDateKey(current)
      daysMap.set(dateKey, 0)
      current.setDate(current.getDate() + 1)
    }

    visitors.forEach((visitor) => {
      const visitorDate = new Date(visitor.createdAt)
      const dateKey = toLocalDateKey(visitorDate)
      if (daysMap.has(dateKey)) {
        daysMap.set(dateKey, (daysMap.get(dateKey) || 0) + 1)
      }
    })

    const dayFormatter = new Intl.DateTimeFormat('es-CO', { weekday: 'short' })
    const data: DayData[] = []
    const iter = new Date(start)
    while (iter <= end) {
      const dateKey = toLocalDateKey(iter)
      data.push({
        date: dateKey,
        count: daysMap.get(dateKey) || 0,
        dayLabel: dayFormatter.format(iter).replace('.', '').toUpperCase(),
        dayNumber: iter.getDate(),
      })
      iter.setDate(iter.getDate() + 1)
    }

    return data
  }, [visitors, dateRange])

  const maxCount = Math.max(...chartData.map((d) => d.count), 0)
  const yMax = Math.max(4, maxCount)
  const yStep = Math.max(1, Math.ceil(yMax / 4))
  const chartMax = yStep * 4
  const yTicks = [chartMax, chartMax - yStep, chartMax - yStep * 2, chartMax - yStep * 3, 0]
  const activeCount = visitors.filter((v) => v.status === 'active').length
  const departedCount = visitors.filter((v) => v.status === 'departed').length

  const weekRangeLabel = useMemo(() => {
    if (!chartData.length) return ''
    const [fromYear, fromMonth, fromDay] = chartData[0].date.split('-').map(Number)
    const [toYear, toMonth, toDay] = chartData[chartData.length - 1].date.split('-').map(Number)
    const from = new Date(fromYear, fromMonth - 1, fromDay)
    const to = new Date(toYear, toMonth - 1, toDay)
    const rangeFormatter = new Intl.DateTimeFormat('es-CO', { day: '2-digit', month: '2-digit', year: 'numeric' })
    return `${rangeFormatter.format(from)} - ${rangeFormatter.format(to)}`
  }, [chartData])

  return (
    <div className={cn('rounded-lg border bg-card p-4', className)}>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold">Registros de la semana</h3>
        <span className="text-xs font-medium text-muted-foreground">{weekRangeLabel}</span>
      </div>

      <div className="mb-4 grid grid-cols-2 gap-2 text-xs">
        <div className="rounded-md bg-muted/50 px-2 py-1 text-muted-foreground">
          Activos: <span className="font-semibold text-foreground">{activeCount}</span>
        </div>
        <div className="rounded-md bg-muted/50 px-2 py-1 text-muted-foreground">
          Históricos: <span className="font-semibold text-foreground">{departedCount}</span>
        </div>
      </div>

      <div className="rounded-lg border border-border/60 bg-background/60 p-3">
        <div className="flex gap-3">
          <div className="flex h-44 w-8 flex-col justify-between text-[10px] font-semibold text-muted-foreground">
            {yTicks.map((tick) => (
              <span key={tick} className="text-right leading-none">{tick}</span>
            ))}
          </div>

          <div className="relative flex-1">
            <div className="absolute inset-0 flex flex-col justify-between">
              {yTicks.map((tick) => (
                <div key={`line-${tick}`} className="border-t border-dashed border-border/60" />
              ))}
            </div>

            <div className="relative flex h-44 items-end justify-between gap-2 pt-2">
              {chartData.map((day) => {
                const barHeightPercent = chartMax > 0 ? (day.count / chartMax) * 100 : 0
                return (
                  <div key={day.date} className="flex flex-1 flex-col items-center gap-1">
                    <div className="flex h-32 w-full items-end">
                      <div
                        className={cn(
                          'relative w-full rounded-sm transition-all',
                          day.count > 0 ? 'bg-primary/75' : 'bg-muted'
                        )}
                        style={{ height: `${barHeightPercent}%` }}
                        title={`${day.dayLabel} ${day.dayNumber}: ${day.count} registro${day.count !== 1 ? 's' : ''}`}
                      >
                        {day.count > 0 && (
                          <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-primary-foreground">
                            {day.count}
                          </span>
                        )}
                      </div>
                    </div>
                    <span className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">{day.dayLabel}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
