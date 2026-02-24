import { FiAlertCircle } from 'react-icons/fi'
import { cn } from '@/lib/utils'

export interface AlertBannerProps {
  title?: string
  message?: string
  actionLabel?: string
  onAction?: () => void
  className?: string
}

export function AlertBanner({
  title = 'No se pudo guardar',
  message = 'Ocurrió un error al guardar el registro',
  actionLabel = 'Intentar de nuevo',
  onAction,
  className,
}: AlertBannerProps) {
  return (
    <div
      role="alert"
      className={cn(
        'flex flex-col gap-2 rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-destructive',
        className
      )}
    >
      <div className="flex items-center gap-2">
        <FiAlertCircle className="h-5 w-5 shrink-0" />
        <span className="font-semibold">{title}</span>
      </div>
      {message && <p className="text-sm pl-7">{message}</p>}
      {onAction && (
        <button
          type="button"
          onClick={onAction}
          className="mt-1 self-start rounded-md px-3 py-1.5 text-sm font-medium bg-destructive/20 hover:bg-destructive/30 transition-colors"
        >
          {actionLabel}
        </button>
      )}
    </div>
  )
}
