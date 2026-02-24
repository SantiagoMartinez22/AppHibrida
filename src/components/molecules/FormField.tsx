import { forwardRef } from 'react'
import { Label } from '@/components/atoms/Label'
import { AppInput } from '@/components/atoms/AppInput'
import { cn } from '@/lib/utils'

export interface FormFieldProps
  extends Omit<React.ComponentPropsWithoutRef<typeof AppInput>, 'id'> {
  id: string
  label: string
  error?: string
  required?: boolean
}

export const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  ({ id, label, error, required, className, ...props }, ref) => {
    return (
      <div className="space-y-2">
        <Label htmlFor={id} className={cn(error && 'text-destructive')}>
          {label}
          {required && <span className="text-destructive ml-0.5">*</span>}
        </Label>
        <AppInput
          ref={ref}
          id={id}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          className={cn(error && 'border-destructive focus-visible:ring-destructive', className)}
          {...props}
        />
        {error && (
          <p id={`${id}-error`} className="text-sm text-destructive" role="alert">
            {error}
          </p>
        )}
      </div>
    )
  }
)

FormField.displayName = 'FormField'
