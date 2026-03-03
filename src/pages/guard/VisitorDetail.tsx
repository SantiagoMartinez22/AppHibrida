import { useParams, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { toast } from 'sonner'
import { PageHeader } from '@/components/templates/PageHeader'
import { StatusBadge } from '@/components/atoms/StatusBadge'
import { AppButton } from '@/components/atoms/AppButton'
import { ConfirmModal } from '@/components/molecules/ConfirmModal'
import { useVisitorStore } from '@/store/visitorStore'

const DATE_TIME_FORMAT = new Intl.DateTimeFormat('es', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  hour12: true,
})

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
      <span className="font-medium">{value || '—'}</span>
    </div>
  )
}

export function VisitorDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const visitors = useVisitorStore((s) => s.visitors)
  const checkOutVisitor = useVisitorStore((s) => s.checkOutVisitor)
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false)

  const visitor = visitors.find((v) => v.id === id)

  if (!visitor) {
    return (
      <main className="min-h-screen bg-background">
        <div className="max-w-lg mx-auto px-4 py-6">
          <PageHeader title="Detalle del Registro" />
          <p className="text-muted-foreground">Registro no encontrado.</p>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="mt-4 text-primary font-medium"
          >
            Volver
          </button>
        </div>
      </main>
    )
  }

  const entryDateTime = DATE_TIME_FORMAT.format(new Date(visitor.createdAt))

  const handleConfirmCheckout = () => {
    checkOutVisitor(visitor.id)
    setIsCheckoutModalOpen(false)
    toast.success('Salida registrada')
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-lg mx-auto px-4 py-6">
        <PageHeader title="Detalle del Registro" />
        <div className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm space-y-4">
          <div className="flex items-center justify-between rounded-md bg-muted/50 px-3 py-2">
            <span className="text-sm text-muted-foreground">Estado:</span>
            <StatusBadge status={visitor.status} />
          </div>
          <DetailRow label="Tipo" value="Visitante" />
          <DetailRow label="Nombre del visitante" value={visitor.visitorName} />
          <DetailRow label="Destino" value={visitor.destination} />
          <DetailRow label="Observación" value={visitor.observation ?? ''} />
          <DetailRow label="Fecha/Hora de entrada" value={entryDateTime} />
          <DetailRow label="Registrado por" value={visitor.registeredBy} />

          {visitor.status === 'active' && (
            <div className="pt-2">
              <AppButton type="button" onClick={() => setIsCheckoutModalOpen(true)}>
                Registrar salida
              </AppButton>
            </div>
          )}
        </div>
      </div>

      <ConfirmModal
        open={isCheckoutModalOpen}
        title="Registrar salida"
        description="¿Seguro que quiere registrar la salida de este visitante?"
        confirmLabel="Sí, registrar"
        cancelLabel="Cancelar"
        onConfirm={handleConfirmCheckout}
        onCancel={() => setIsCheckoutModalOpen(false)}
      />
    </main>
  )
}
