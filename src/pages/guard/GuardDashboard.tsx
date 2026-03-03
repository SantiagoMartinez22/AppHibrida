import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiPlus, FiChevronRight } from 'react-icons/fi'
import { toast } from 'sonner'
import { DashboardStats } from '@/components/organisms/DashboardStats'
import { BottomNavBar } from '@/components/templates/BottomNavBar'
import { AppButton } from '@/components/atoms/AppButton'
import { AppInput } from '@/components/atoms/AppInput'
import { cn } from '@/lib/utils'
import { useAuthStore } from '@/store/authStore'
import { useHandoverStore } from '@/store/handoverStore'

export function GuardDashboard() {
  const navigate = useNavigate()
  const [handoverUser, setHandoverUser] = useState('')
  const [handoverError, setHandoverError] = useState<string | null>(null)

  const session = useAuthStore((s) => s.session)
  const logout = useAuthStore((s) => s.logout)
  const deliverTurn = useHandoverStore((s) => s.deliverTurn)

  const handleDeliverTurn = () => {
    const nextUser = handoverUser.trim()
    if (!nextUser) {
      setHandoverError('Indica el usuario que recibe el turno')
      return
    }

    if (!session?.username) {
      setHandoverError('No hay un vigilante autenticado')
      return
    }

    deliverTurn({ fromUser: session.username, toUser: nextUser })
    logout({
      type: 'success',
      title: 'Turno entregado correctamente',
      description: `Turno transferido a ${nextUser}`,
    })
    toast.success(`Turno entregado a ${nextUser}`)
    navigate('/', { replace: true })
  }

  return (
    <main className="min-h-screen bg-background pb-20">
      <div className="max-w-lg mx-auto px-4 py-6">
        <p className="text-sm text-muted-foreground">Buenos días</p>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Vigilante activo: <span className="font-medium text-foreground">{session?.username ?? '—'}</span>
        </p>

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

        <section className="mt-6">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">
            Entrega de turno
          </p>
          <div className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm space-y-3">
            <AppInput
              placeholder="Usuario que recibe el turno"
              value={handoverUser}
              onChange={(e) => {
                setHandoverUser(e.target.value)
                if (handoverError) setHandoverError(null)
              }}
            />
            {handoverError && <p className="text-sm text-destructive">{handoverError}</p>}
            <AppButton type="button" onClick={handleDeliverTurn}>
              Entregar turno
            </AppButton>
          </div>
        </section>
      </div>
      <BottomNavBar />
    </main>
  )
}
