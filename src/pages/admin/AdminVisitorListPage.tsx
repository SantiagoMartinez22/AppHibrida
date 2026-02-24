import { useState, useMemo } from 'react'
import { SearchInput } from '@/components/atoms/SearchInput'
import { ThreeTabToggle } from '@/components/molecules/ThreeTabToggle'
import { VisitorCard } from '@/components/molecules/VisitorCard'
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
      ? visitors.filter((v) => v.status === 'departed')
      : []
    
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

  const title = 'Visitantes Activos'

  return (
    <main className="min-h-screen bg-background pb-20">
      <div className="max-w-lg mx-auto px-4 py-6">
        <PageHeader title={title} />
        <SearchInput
          placeholder="Buscar..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mb-4"
        />
        <ThreeTabToggle<TabValue>
          options={[
            { value: 'active', label: 'Activos' },
            { value: 'history', label: 'Historial' },
            { value: 'stats', label: 'Estadísticas' },
          ]}
          value={tab}
          onChange={setTab}
          className="mb-4"
        />
        
        {tab === 'stats' ? (
          <div className="flex items-center justify-center py-16">
            <p className="text-lg text-muted-foreground">Próximamente</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((visitor) => (
              <VisitorCard
                key={visitor.id}
                visitor={visitor}
                showCheckoutButton={false}
                basePath="/admin/visitors"
              />
            ))}
            {filtered.length === 0 && (
              <p className="text-center text-muted-foreground py-8">
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
