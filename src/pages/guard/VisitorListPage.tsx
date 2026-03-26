import { useState } from 'react'
import { SearchInput } from '@/components/atoms/SearchInput'
import { TabToggle } from '@/components/molecules/TabToggle'
import { VisitorCard } from '@/components/molecules/VisitorCard'
import { PageHeader } from '@/components/templates/PageHeader'
import { BottomNavBar } from '@/components/templates/BottomNavBar'
import { useVisitorStore } from '@/store/visitorStore'
import { useVisitorFilter } from '@/hooks/useVisitorFilter'
import type { VisitorFilterTab } from '@/hooks/useVisitorFilter'

export function VisitorListPage() {
  const [search, setSearch] = useState('')
  const [tab, setTab] = useState<VisitorFilterTab>('active')

  const visitors = useVisitorStore((s) => s.visitors)
  const filtered = useVisitorFilter({ visitors, search, tab })

  const title = tab === 'active' ? 'Visitantes Activos' : 'Historial de Registros'

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
            ]}
            value={tab}
            onChange={setTab}
          />
        </section>

        <div className="grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(280px,1fr))]">
          {filtered.map((visitor) => (
            <VisitorCard
              key={visitor.id}
              visitor={visitor}
              showCheckoutButton={tab === 'active'}
            />
          ))}
          {filtered.length === 0 && (
            <p className="col-span-full py-8 text-center text-muted-foreground">
              {search ? 'No hay resultados' : 'No hay visitantes'}
            </p>
          )}
        </div>
      </div>
      <BottomNavBar />
    </main>
  )
}
