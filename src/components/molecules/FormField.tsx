import { forwardRef } from 'react'
import { Label } from '@/components/atoms/Label'
import { AppInput } from '@/components/atoms/AppInput'
import { AppTextarea } from '@/components/atoms/AppTextarea'
import { cn } from '@/lib/utils'

export interface FormFieldProps
  extends Omit<React.ComponentPropsWithoutRef<typeof AppInput>, 'id'> {
  id: string
  label: string
  error?: string
  required?: boolean
  multiline?: boolean
}

export const FormField = forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  FormFieldProps
>(({ id, label, error, required, multiline, className, ...props }, ref) => {
  const inputClassName = cn(
    error && 'border-destructive focus-visible:ring-destructive',
    className
  )

  return (
    <div className="space-y-2">
      <Label htmlFor={id} className={cn(error && 'text-destructive')}>
        {label}
        {required && <span className="text-destructive ml-0.5">*</span>}
      </Label>
      {multiline ? (
        <AppTextarea
          ref={ref as React.Ref<HTMLTextAreaElement>}
          id={id}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          className={inputClassName}
          {...(props as React.ComponentPropsWithoutRef<typeof AppTextarea>)}
        />
      ) : (
        <AppInput
          ref={ref as React.Ref<HTMLInputElement>}
          id={id}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          className={inputClassName}
          {...props}
        />
      )}
      {error && (
        <p id={`${id}-error`} className="text-sm text-destructive" role="alert">
          {error}
        </p>
      )}
    </div>
  )
})

FormField.displayName = 'FormField'
