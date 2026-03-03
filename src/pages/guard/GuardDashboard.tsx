import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { FiPlus, FiChevronRight } from 'react-icons/fi'
import { toast } from 'sonner'
import { DashboardStats } from '@/components/organisms/DashboardStats'
import { BottomNavBar } from '@/components/templates/BottomNavBar'
import { AppButton } from '@/components/atoms/AppButton'
import { ConfirmModal } from '@/components/molecules/ConfirmModal'
import { cn } from '@/lib/utils'
import { useAuthStore } from '@/store/authStore'
import { useHandoverStore } from '@/store/handoverStore'

export function GuardDashboard() {
  const navigate = useNavigate()
  const [isHandoverModalOpen, setIsHandoverModalOpen] = useState(false)

  const session = useAuthStore((s) => s.session)
  const logout = useAuthStore((s) => s.logout)
  const deliverTurn = useHandoverStore((s) => s.deliverTurn)

  const handleDeliverTurn = () => {
    if (!session?.username) {
      toast.error('No hay un vigilante autenticado')
      return
    }

    setIsHandoverModalOpen(true)
  }

  const confirmDeliverTurn = () => {
    if (!session?.username) {
      setIsHandoverModalOpen(false)
      return
    }

    deliverTurn({ fromUser: session.username })
    logout({
      type: 'success',
      title: 'Turno entregado correctamente',
      description: 'La sesión se cerró para permitir el siguiente ingreso',
    })
    setIsHandoverModalOpen(false)
    toast.success('Turno entregado correctamente')
    navigate('/', { replace: true })
  }

  return (
    <main className="min-h-screen bg-background pb-28 md:pb-8 md:pt-24">
      <div className="max-w-5xl mx-auto px-4 py-6">
        <p className="text-sm text-muted-foreground">Buenos días</p>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="mt-1 text-sm text-muted-foreground">
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
            <p className="text-sm text-muted-foreground">
              Registra el cierre del turno actual. El siguiente vigilante iniciará sesión con su propio usuario.
            </p>
            <AppButton type="button" onClick={handleDeliverTurn}>
              Registrar entrega de turno
            </AppButton>
          </div>
        </section>
      </div>
      <ConfirmModal
        open={isHandoverModalOpen}
        title="Entrega de turno"
        description="¿Seguro que quiere registrar la entrega de turno?"
        confirmLabel="Sí, entregar"
        cancelLabel="Cancelar"
        onConfirm={confirmDeliverTurn}
        onCancel={() => setIsHandoverModalOpen(false)}
      />
      <BottomNavBar />
    </main>
  )
}
