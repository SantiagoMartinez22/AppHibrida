import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiChevronRight } from 'react-icons/fi'
import { DashboardStats } from '@/components/organisms/DashboardStats'
import { RecentActivityCard } from '@/components/molecules/RecentActivityCard'
import { BottomNavBar } from '@/components/templates/BottomNavBar'
import { useVisitorStore } from '@/store/visitorStore'
import { useHandoverStore } from '@/store/handoverStore'
import { cn } from '@/lib/utils'

export function AdminDashboard() {
  const navigate = useNavigate()
  const visitors = useVisitorStore((s) => s.visitors)
  const handovers = useHandoverStore((s) => s.handovers)

  // Get last 5 visitor activities (sorted by creation date, most recent first)
  const recentActivities = useMemo(() => {
    return [...visitors]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 5)
  }, [visitors])

  return (
    <main className="min-h-screen bg-background pb-28 md:pb-8 md:pt-24">
      <div className="max-w-5xl mx-auto px-4 py-6">
        <div className="flex items-center gap-3">
          <img
            src="/vigilante_gordo.webp"
            alt="Vigilante VigiLog"
            className="h-20 w-auto max-w-[130px] shrink-0 object-contain mix-blend-multiply saturate-110 dark:rounded-xl dark:mix-blend-normal dark:contrast-125 dark:brightness-110 dark:drop-shadow-md"
          />
          <div>
            <p className="text-sm text-muted-foreground">Buenos días</p>
            <h1 className="text-2xl font-bold">Dashboard</h1>
          </div>
        </div>

        <section className="mt-8">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">
            Consultas
          </p>
          <button
            type="button"
            onClick={() => navigate('/admin/visitors')}
            className={cn(
              'flex w-full items-center justify-between rounded-lg border bg-card p-4 text-card-foreground shadow-sm',
              'hover:bg-accent/50 transition-colors'
            )}
          >
            <span className="font-semibold">Visitantes</span>
            <FiChevronRight className="h-5 w-5 text-muted-foreground" aria-hidden />
          </button>
        </section>

        <section className="mt-6">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">
            Últimos registros
          </p>
          <div className="space-y-3">
            {recentActivities.length > 0 ? (
              recentActivities.map((visitor) => (
                <RecentActivityCard key={visitor.id} visitor={visitor} />
              ))
            ) : (
              <p className="text-center text-muted-foreground py-4">
                No hay registros recientes
              </p>
            )}
          </div>
        </section>

        <section className="mt-6">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">
            Resumen del día
          </p>
          <DashboardStats />
        </section>

        <section className="mt-6">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">
            Entregas de turno recientes
          </p>
          <div className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm space-y-2">
            {handovers.length === 0 ? (
              <p className="text-sm text-muted-foreground">No hay entregas de turno registradas.</p>
            ) : (
              handovers.slice(0, 3).map((handover) => (
                <div key={handover.id} className="rounded-md bg-muted/40 px-3 py-2">
                  <p className="text-sm font-medium">
                    {handover.fromUser} → {handover.toUser || 'Siguiente vigilante (por autenticación)'}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(handover.deliveredAt).toLocaleString('es-CO')}
                  </p>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
      <BottomNavBar />
    </main>
  )
}
