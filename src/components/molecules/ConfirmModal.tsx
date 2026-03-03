import { useEffect } from 'react'
import { AppButton } from '@/components/atoms/AppButton'

export interface ConfirmModalProps {
  open: boolean
  title: string
  description: string
  confirmLabel?: string
  cancelLabel?: string
  onConfirm: () => void
  onCancel: () => void
}

export function ConfirmModal({
  open,
  title,
  description,
  confirmLabel = 'Confirmar',
  cancelLabel = 'Cancelar',
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  useEffect(() => {
    if (!open) return

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onCancel()
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleEscape)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleEscape)
    }
  }, [open, onCancel])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[90] flex items-center justify-center bg-foreground/45 px-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onClick={onCancel}
    >
      <section
        className="w-full max-w-md rounded-2xl border border-border/70 bg-card p-5 text-card-foreground shadow-xl ring-1 ring-primary/15"
        onClick={(event) => event.stopPropagation()}
      >
        <h2 className="text-lg font-semibold text-foreground">{title}</h2>
        <p className="mt-2 text-sm text-muted-foreground">{description}</p>

        <div className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2">
          <AppButton type="button" variant="outline" onClick={onCancel}>
            {cancelLabel}
          </AppButton>
          <AppButton type="button" onClick={onConfirm}>
            {confirmLabel}
          </AppButton>
        </div>
      </section>
    </div>
  )
}
