import { useState, useMemo } from 'react'
import { SearchInput } from '@/components/atoms/SearchInput'
import { TabToggle } from '@/components/molecules/TabToggle'
import { VisitorCard } from '@/components/molecules/VisitorCard'
import { VisitorBarChart } from '@/components/molecules/VisitorBarChart'
import { MonthCalendar } from '@/components/molecules/MonthCalendar'
import { PageHeader } from '@/components/templates/PageHeader'
import { BottomNavBar } from '@/components/templates/BottomNavBar'
import { useVisitorStore } from '@/store/visitorStore'
import { useVisitorFilter } from '@/hooks/useVisitorFilter'
import type { VisitorFilterTab } from '@/hooks/useVisitorFilter'

export function AdminVisitorListPage() {
  const [search, setSearch] = useState('')
  const [tab, setTab] = useState<VisitorFilterTab>('active')
  const [statsDate, setStatsDate] = useState(new Date())

  const visitors = useVisitorStore((s) => s.visitors)
  const filtered = useVisitorFilter({ visitors, search, tab })

  const title = tab === 'active'
    ? 'Visitantes Activos'
    : tab === 'history'
      ? 'Historial de Registros'
      : 'Estadísticas de Visitantes'

  const statsDateRange = useMemo(() => {
    const selected = new Date(statsDate)
    const day = selected.getDay()
    const mondayOffset = day === 0 ? -6 : 1 - day

    const start = new Date(selected)
    start.setDate(selected.getDate() + mondayOffset)
    start.setHours(0, 0, 0, 0)

    const end = new Date(start)
    end.setDate(start.getDate() + 6)

    return {
      start,
      end,
    }
  }, [statsDate])

  return (
    <main className="min-h-screen bg-background pb-28 md:pb-8 md:pt-24">
      <div className="max-w-5xl mx-auto px-4 py-6">
        <PageHeader title={title} />
        <section className="mx-auto mb-4 w-full max-w-3xl space-y-4">
          <SearchInput
            placeholder="Buscar..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <TabToggle<VisitorFilterTab>
            options={[
              { value: 'active', label: 'Activos' },
              { value: 'history', label: 'Historial' },
              { value: 'stats', label: 'Estadísticas' },
            ]}
            value={tab}
            onChange={setTab}
          />
        </section>

        {tab === 'stats' ? (
          <div className="grid gap-4 md:grid-cols-2">
            <VisitorBarChart visitors={visitors} dateRange={statsDateRange} />
            <MonthCalendar selectedDate={statsDate} onDateSelect={setStatsDate} />
          </div>
        ) : (
          <div className="grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(280px,1fr))]">
            {filtered.map((visitor) => (
              <VisitorCard
                key={visitor.id}
                visitor={visitor}
                showCheckoutButton={false}
                basePath="/admin/visitors"
              />
            ))}
            {filtered.length === 0 && (
              <p className="col-span-full py-8 text-center text-muted-foreground">
                {search ? 'No hay resultados' : 'No hay visitantes'}
              </p>
            )}
          </div>
        )}
      </div>
      <BottomNavBar />
    </main>
  )
}
