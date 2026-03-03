import { cn } from '@/lib/utils'

export interface StatCardProps {
  value: number
  label: string
  className?: string
}

export function StatCard({ value, label, className }: StatCardProps) {
  return (
    <div
      className={cn(
        'flex min-w-0 flex-1 flex-col items-center justify-center rounded-lg border bg-card p-4 text-center text-card-foreground shadow-sm',
        className
      )}
    >
      <span className="w-full text-2xl font-bold leading-none sm:text-3xl">{value}</span>
      <span className="mt-1 w-full text-xs font-medium uppercase tracking-wide text-muted-foreground sm:text-sm sm:normal-case sm:tracking-normal">{label}</span>
    </div>
  )
}
