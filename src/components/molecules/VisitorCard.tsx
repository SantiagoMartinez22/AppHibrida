import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { FiChevronRight } from 'react-icons/fi'
import { toast } from 'sonner'
import { StatusBadge } from '@/components/atoms/StatusBadge'
import { AppButton } from '@/components/atoms/AppButton'
import { ConfirmModal } from '@/components/molecules/ConfirmModal'
import { useVisitorStore } from '@/store/visitorStore'
import type { VisitorRecord } from '@/types'
import { cn } from '@/lib/utils'

const TIME_FORMAT = new Intl.DateTimeFormat('es', {
  hour: '2-digit',
  minute: '2-digit',
})

export interface VisitorCardProps {
  visitor: VisitorRecord
  showCheckoutButton?: boolean
  className?: string
  basePath?: string
}

export function VisitorCard({
  visitor,
  showCheckoutButton = false,
  className,
  basePath = '/guard/visitors',
}: VisitorCardProps) {
  const navigate = useNavigate()
  const checkOutVisitor = useVisitorStore((s) => s.checkOutVisitor)
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false)

  const entryTime = TIME_FORMAT.format(new Date(visitor.createdAt))

  const handleCheckout = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsCheckoutModalOpen(true)
  }

  const confirmCheckout = () => {
    checkOutVisitor(visitor.id)
    setIsCheckoutModalOpen(false)
    toast.success('Salida registrada')
  }

  const handleCardClick = () => {
    navigate(`${basePath}/${visitor.id}`)
  }

  return (
    <div
      className={cn(
        'app-surface group cursor-pointer p-4 transition-all hover:-translate-y-0.5 hover:bg-accent/50 hover:shadow-md',
        className
      )}
      onClick={handleCardClick}
      role="button"
    >
      <div className="mb-3 h-1 w-14 rounded-full bg-primary/70" aria-hidden />
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="font-semibold text-foreground">{visitor.visitorName}</p>
          <p className="mt-0.5 text-sm text-muted-foreground">{visitor.destination}</p>
          <p className="mt-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">Entrada {entryTime}</p>
        </div>
        <StatusBadge status={visitor.status} className="shrink-0" />
      </div>
      {showCheckoutButton && visitor.status === 'active' && (
        <AppButton
          type="button"
          variant="primary"
          className="mt-3 w-full"
          onClick={handleCheckout}
        >
          Registrar salida
        </AppButton>
      )}
      {!showCheckoutButton && (
        <div className="mt-2 flex justify-end">
          <FiChevronRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" aria-hidden />
        </div>
      )}

      <ConfirmModal
        open={isCheckoutModalOpen}
        title="Registrar salida"
        description="¿Seguro que quiere registrar la salida de este visitante?"
        confirmLabel="Sí, registrar"
        cancelLabel="Cancelar"
        onConfirm={confirmCheckout}
        onCancel={() => setIsCheckoutModalOpen(false)}
      />
    </div>
  )
}
