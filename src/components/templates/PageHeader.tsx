import { BackButton } from '@/components/atoms/BackButton'
import { cn } from '@/lib/utils'

export interface PageHeaderProps {
  title: string
  onBack?: () => void
  className?: string
}

export function PageHeader({ title, onBack, className }: PageHeaderProps) {
  return (
    <header
      className={cn(
        'mb-4 flex items-center gap-3 rounded-xl border border-border/70 bg-card/80 px-3 py-3 shadow-sm',
        className
      )}
    >
      <BackButton onClick={onBack} />
      <div className="min-w-0">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">VigiLog</p>
        <h1 className="truncate text-xl font-bold leading-tight">{title}</h1>
      </div>
    </header>
  )
}
