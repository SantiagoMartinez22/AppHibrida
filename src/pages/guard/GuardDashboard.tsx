import { useNavigate } from 'react-router-dom'
import { FiPlus, FiChevronRight } from 'react-icons/fi'
import { DashboardStats } from '@/components/organisms/DashboardStats'
import { BottomNavBar } from '@/components/templates/BottomNavBar'
import { cn } from '@/lib/utils'

export function GuardDashboard() {
  const navigate = useNavigate()

  return (
    <main className="min-h-screen bg-background pb-20">
      <div className="max-w-lg mx-auto px-4 py-6">
        <p className="text-sm text-muted-foreground">Buenos días</p>
        <h1 className="text-2xl font-bold">Dashboard</h1>

        <section className="mt-8">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">
            Registros
          </p>
          <button
            type="button"
            onClick={() => navigate('/guard/register')}
            className={cn(
              'flex w-full items-center justify-center gap-2 rounded-lg border bg-card p-4 text-card-foreground shadow-sm',
              'hover:bg-accent/50 transition-colors'
            )}
          >
            <FiPlus className="h-5 w-5" aria-hidden />
            <span className="font-semibold">Nuevo Visitante</span>
          </button>
        </section>

        <section className="mt-6">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">
            Consultas
          </p>
          <button
            type="button"
            onClick={() => navigate('/guard/visitors')}
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
            Resumen del día
          </p>
          <DashboardStats />
        </section>
      </div>
      <BottomNavBar />
    </main>
  )
}
