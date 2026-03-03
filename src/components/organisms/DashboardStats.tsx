import { useMemo } from 'react'
import { StatCard } from '@/components/molecules/StatCard'
import { useVisitorStore } from '@/store/visitorStore'
import { isToday, isWithinLastHour } from '@/lib/date-utils'

export function DashboardStats() {
  const visitors = useVisitorStore((s) => s.visitors)

  const { todayCount, activeCount, lastHourCount } = useMemo(() => {
    const today = visitors.filter((v) => isToday(v.createdAt))
    const active = visitors.filter((v) => v.status === 'active')
    const lastHour = visitors.filter((v) => isWithinLastHour(v.createdAt))
    return {
      todayCount: today.length,
      activeCount: active.length,
      lastHourCount: lastHour.length,
    }
  }, [visitors])

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      <StatCard value={todayCount} label="Registros" />
      <StatCard value={activeCount} label="En sitio" />
      <StatCard value={lastHourCount} label="Última hora" />
    </div>
  )
}
