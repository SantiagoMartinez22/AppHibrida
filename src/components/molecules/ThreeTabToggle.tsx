import { cn } from '@/lib/utils'

export interface ThreeTabToggleOption<T extends string> {
  value: T
  label: string
}

export interface ThreeTabToggleProps<T extends string> {
  options: [ThreeTabToggleOption<T>, ThreeTabToggleOption<T>, ThreeTabToggleOption<T>]
  value: T
  onChange: (value: T) => void
  className?: string
}

export function ThreeTabToggle<T extends string>({
  options,
  value,
  onChange,
  className,
}: ThreeTabToggleProps<T>) {
  return (
    <div
      className={cn(
        'inline-flex rounded-full border border-input bg-muted/30 p-0.5',
        className
      )}
      role="tablist"
    >
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          role="tab"
          aria-selected={value === opt.value}
          onClick={() => onChange(opt.value)}
          className={cn(
            'rounded-full px-4 py-2 text-sm font-medium transition-colors',
            value === opt.value
              ? 'bg-primary text-primary-foreground'
              : 'bg-transparent text-muted-foreground hover:text-foreground'
          )}
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}
