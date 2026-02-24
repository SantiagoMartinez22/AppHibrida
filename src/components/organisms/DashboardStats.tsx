import { useMemo } from 'react'
import { StatCard } from '@/components/molecules/StatCard'
import { useVisitorStore } from '@/store/visitorStore'

function isToday(iso: string): boolean {
  const d = new Date(iso)
  const today = new Date()
  return d.getFullYear() === today.getFullYear() &&
    d.getMonth() === today.getMonth() &&
    d.getDate() === today.getDate()
}

function isLastHour(iso: string): boolean {
  const d = new Date(iso).getTime()
  const now = Date.now()
  return now - d <= 60 * 60 * 1000
}

export function DashboardStats() {
  const visitors = useVisitorStore((s) => s.visitors)

  const { todayCount, activeCount, lastHourCount } = useMemo(() => {
    const today = visitors.filter((v) => isToday(v.createdAt))
    const active = visitors.filter((v) => v.status === 'active')
    const lastHour = visitors.filter((v) => isLastHour(v.createdAt))
    return {
      todayCount: today.length,
      activeCount: active.length,
      lastHourCount: lastHour.length,
    }
  }, [visitors])

  return (
    <div className="grid grid-cols-3 gap-3">
      <StatCard value={todayCount} label="Registros" />
      <StatCard value={activeCount} label="En sitio" />
      <StatCard value={lastHourCount} label="Última hora" />
    </div>
  )
}
