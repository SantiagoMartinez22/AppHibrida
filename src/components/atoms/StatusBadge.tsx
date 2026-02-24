import { cn } from '@/lib/utils'
import type { VisitorStatus } from '@/types'

export interface StatusBadgeProps {
  status: VisitorStatus
  className?: string
}

const LABELS: Record<VisitorStatus, string> = {
  active: 'EN SITIO',
  departed: 'SALIDA',
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold uppercase',
        status === 'active' && 'bg-primary text-primary-foreground',
        status === 'departed' && 'border border-muted-foreground/50 bg-muted text-muted-foreground',
        className
      )}
    >
      {LABELS[status]}
    </span>
  )
}
