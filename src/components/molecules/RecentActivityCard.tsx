import { useNavigate } from 'react-router-dom'
import { FiChevronRight } from 'react-icons/fi'
import { StatusBadge } from '@/components/atoms/StatusBadge'
import type { VisitorRecord } from '@/types'
import { cn } from '@/lib/utils'

export interface RecentActivityCardProps {
  visitor: VisitorRecord
  className?: string
}

export function RecentActivityCard({
  visitor,
  className,
}: RecentActivityCardProps) {
  const navigate = useNavigate()

  const activityType = visitor.status === 'active' ? 'Entrada' : 'Salida'

  const handleClick = () => {
    navigate(`/admin/visitors/${visitor.id}`)
  }

  return (
    <div
      className={cn(
        'rounded-lg border bg-card p-4 text-card-foreground shadow-sm cursor-pointer hover:bg-accent/50',
        className
      )}
      onClick={handleClick}
      role="button"
    >
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <StatusBadge status={visitor.status} className="shrink-0" />
            <span className="font-semibold">{activityType}</span>
          </div>
          <p className="font-medium mt-1">{visitor.visitorName}</p>
          <p className="text-sm text-muted-foreground">{visitor.destination}</p>
        </div>
        <FiChevronRight className="h-5 w-5 text-muted-foreground shrink-0" aria-hidden />
      </div>
    </div>
  )
}
