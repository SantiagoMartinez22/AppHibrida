import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiChevronRight } from 'react-icons/fi'
import { DashboardStats } from '@/components/organisms/DashboardStats'
import { RecentActivityCard } from '@/components/molecules/RecentActivityCard'
import { BottomNavBar } from '@/components/templates/BottomNavBar'
import { useVisitorStore } from '@/store/visitorStore'
import { cn } from '@/lib/utils'

export function AdminDashboard() {
  const navigate = useNavigate()
  const visitors = useVisitorStore((s) => s.visitors)

  // Get last 5 visitor activities (sorted by creation date, most recent first)
  const recentActivities = useMemo(() => {
    return [...visitors]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 5)
  }, [visitors])

  return (
    <main className="min-h-screen bg-background pb-20">
      <div className="max-w-lg mx-auto px-4 py-6">
        <p className="text-sm text-muted-foreground">Buenos días</p>
        <h1 className="text-2xl font-bold">Dashboard</h1>

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
      </div>
      <BottomNavBar />
    </main>
  )
}
