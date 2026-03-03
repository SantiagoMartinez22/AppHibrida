import { useState, useMemo } from 'react'
import { SearchInput } from '@/components/atoms/SearchInput'
import { ThreeTabToggle } from '@/components/molecules/ThreeTabToggle'
import { VisitorCard } from '@/components/molecules/VisitorCard'
import { VisitorBarChart } from '@/components/molecules/VisitorBarChart'
import { MonthCalendar } from '@/components/molecules/MonthCalendar'
import { PageHeader } from '@/components/templates/PageHeader'
import { BottomNavBar } from '@/components/templates/BottomNavBar'
import { useVisitorStore } from '@/store/visitorStore'

type TabValue = 'active' | 'history' | 'stats'

export function AdminVisitorListPage() {
  const [search, setSearch] = useState('')
  const [tab, setTab] = useState<TabValue>('active')

  const visitors = useVisitorStore((s) => s.visitors)

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    let list = tab === 'active'
      ? visitors.filter((v) => v.status === 'active')
      : tab === 'history'
      ? [...visitors]
      : []

    if (tab === 'history') {
      list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    }
    
    if (q && tab !== 'stats') {
      list = list.filter(
        (v) =>
          v.visitorName.toLowerCase().includes(q) ||
          v.destination.toLowerCase().includes(q) ||
          v.registeredBy.toLowerCase().includes(q)
      )
    }
    return list
  }, [visitors, tab, search])

  const title = tab === 'active'
    ? 'Visitantes Activos'
    : tab === 'history'
    ? 'Historial de Registros'
    : 'Estadísticas de Visitantes'

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
          <ThreeTabToggle<TabValue>
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
            <VisitorBarChart visitors={visitors} />
            <MonthCalendar />
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
