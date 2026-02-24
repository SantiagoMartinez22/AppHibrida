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
  day: number
}

export function VisitorBarChart({
  visitors,
  dateRange,
  className,
}: VisitorBarChartProps) {
  const chartData = useMemo(() => {
    const today = new Date()
    const start = dateRange?.start ?? new Date(today.getFullYear(), today.getMonth(), 1)
    const end = dateRange?.end ?? new Date(today.getFullYear(), today.getMonth() + 1, 0)

    // Create map of days in range
    const daysMap = new Map<string, number>()
    const current = new Date(start)
    
    while (current <= end) {
      const dateKey = current.toISOString().split('T')[0]
      daysMap.set(dateKey, 0)
      current.setDate(current.getDate() + 1)
    }

    // Count visitors per day
    visitors.forEach((visitor) => {
      const visitorDate = new Date(visitor.createdAt)
      const dateKey = visitorDate.toISOString().split('T')[0]
      if (daysMap.has(dateKey)) {
        daysMap.set(dateKey, (daysMap.get(dateKey) || 0) + 1)
      }
    })

    // Convert to array
    const data: DayData[] = []
    const iter = new Date(start)
    while (iter <= end) {
      const dateKey = iter.toISOString().split('T')[0]
      data.push({
        date: dateKey,
        count: daysMap.get(dateKey) || 0,
        day: iter.getDate(),
      })
      iter.setDate(iter.getDate() + 1)
    }

    return data
  }, [visitors, dateRange])

  const maxCount = Math.max(...chartData.map((d) => d.count), 1)

  return (
    <div className={cn('rounded-lg border bg-card p-4', className)}>
      <h3 className="text-sm font-semibold mb-4">Visitantes por día</h3>
      <div className="flex items-end justify-between gap-1 h-32">
        {chartData.map((day) => {
          const heightPercent = maxCount > 0 ? (day.count / maxCount) * 100 : 0
          return (
            <div
              key={day.date}
              className="flex-1 flex flex-col items-center justify-end gap-1"
            >
              <div
                className={cn(
                  'w-full rounded-sm transition-all',
                  day.count > 0 ? 'bg-primary/60' : 'bg-muted'
                )}
                style={{ height: `${Math.max(heightPercent, 4)}%` }}
                title={`${day.day}: ${day.count} visitante${day.count !== 1 ? 's' : ''}`}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}
