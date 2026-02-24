import { useNavigate } from 'react-router-dom'
import { FiChevronRight } from 'react-icons/fi'
import { toast } from 'sonner'
import { StatusBadge } from '@/components/atoms/StatusBadge'
import { AppButton } from '@/components/atoms/AppButton'
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

  const entryTime = TIME_FORMAT.format(new Date(visitor.createdAt))

  const handleCheckout = (e: React.MouseEvent) => {
    e.stopPropagation()
    checkOutVisitor(visitor.id)
    toast.success('Salida registrada')
  }

  const handleCardClick = () => {
    navigate(`${basePath}/${visitor.id}`)
  }

  return (
    <div
      className={cn(
        'rounded-lg border bg-card p-4 text-card-foreground shadow-sm cursor-pointer hover:bg-accent/50',
        className
      )}
      onClick={handleCardClick}
      role="button"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="font-semibold">{visitor.visitorName}</p>
          <p className="text-sm text-muted-foreground">{visitor.destination}</p>
          <p className="text-sm text-muted-foreground mt-1">{entryTime}</p>
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
          <FiChevronRight className="h-4 w-4 text-muted-foreground" aria-hidden />
        </div>
      )}
    </div>
  )
}
