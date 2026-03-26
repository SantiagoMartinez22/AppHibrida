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
        <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-primary">
          <img
            src="/caballero-armadura-protegido-escudo_1057-219168.avif"
            alt="Logo VigiLog"
            className="h-8 w-8 rounded-full object-cover"
          />
          VigiLog
        </p>
        <h1 className="truncate text-xl font-bold leading-tight">{title}</h1>
      </div>
    </header>
  )
}
