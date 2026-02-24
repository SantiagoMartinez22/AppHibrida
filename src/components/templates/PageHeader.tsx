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
        'flex items-center gap-3 pb-4',
        className
      )}
    >
      <BackButton onClick={onBack} />
      <h1 className="text-xl font-bold">{title}</h1>
    </header>
  )
}
