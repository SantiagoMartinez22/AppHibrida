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
        'flex flex-col items-center justify-center rounded-lg border bg-card p-4 text-card-foreground shadow-sm min-w-0 flex-1',
        className
      )}
    >
      <span className="text-2xl font-bold">{value}</span>
      <span className="text-sm text-muted-foreground">{label}</span>
    </div>
  )
}
