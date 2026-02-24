import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { FormField } from '@/components/molecules/FormField'
import { AlertBanner } from '@/components/molecules/AlertBanner'
import { AppButton } from '@/components/atoms/AppButton'
import { useVisitorStore } from '@/store/visitorStore'

const INITIAL_FORM = {
  registeredBy: '',
  visitorName: '',
  destination: '',
  observation: '',
}

type FormErrors = Partial<Record<keyof typeof INITIAL_FORM, string>>

export function VisitorForm() {
  const navigate = useNavigate()
  const addVisitor = useVisitorStore((s) => s.addVisitor)
  const [form, setForm] = useState(INITIAL_FORM)
  const [errors, setErrors] = useState<FormErrors>({})
  const [saveError, setSaveError] = useState(false)

  const updateField = useCallback((field: keyof typeof INITIAL_FORM, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => (prev[field] ? { ...prev, [field]: undefined } : prev))
  }, [])

  const validate = useCallback((): boolean => {
    const next: FormErrors = {}
    if (!form.registeredBy.trim()) next.registeredBy = 'Requerido'
    if (!form.visitorName.trim()) next.visitorName = 'Requerido'
    if (!form.destination.trim()) next.destination = 'Requerido'
    setErrors(next)
    return Object.keys(next).length === 0
  }, [form])

  const performSave = useCallback(() => {
    setSaveError(false)
    if (!validate()) return

    try {
      addVisitor({
        registeredBy: form.registeredBy.trim(),
        visitorName: form.visitorName.trim(),
        destination: form.destination.trim(),
        observation: form.observation.trim() || undefined,
      })
      toast.success('Registro guardado correctamente')
        setForm(INITIAL_FORM)
        setErrors({})
        navigate('/guard')
    } catch {
      setSaveError(true)
    }
  }, [form, validate, addVisitor, navigate])

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      performSave()
    },
    [performSave]
  )

  const handleRetry = useCallback(() => {
    performSave()
  }, [performSave])

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {saveError && (
        <AlertBanner
          title="No se pudo guardar"
          message="Ocurrió un error al guardar el registro"
          actionLabel="Intentar de nuevo"
          onAction={handleRetry}
        />
      )}

      <div className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
        <h2 className="text-base font-semibold mb-4">Información del Visitante</h2>
        <div className="space-y-4">
          <FormField
            id="registeredBy"
            label="Registrado por"
            required
            placeholder="Ej: Pepito Pérez"
            value={form.registeredBy}
            onChange={(e) => updateField('registeredBy', e.target.value)}
            error={errors.registeredBy}
          />
          <FormField
            id="visitorName"
            label="Nombre del visitante"
            required
            placeholder="Ej: Elba Zurita"
            value={form.visitorName}
            onChange={(e) => updateField('visitorName', e.target.value)}
            error={errors.visitorName}
          />
          <FormField
            id="destination"
            label="Destino / A quién visita"
            required
            placeholder="Ej: Apt XXX, Oficina XXX"
            value={form.destination}
            onChange={(e) => updateField('destination', e.target.value)}
            error={errors.destination}
          />
          <FormField
            id="observation"
            label="Observación"
            placeholder="Detalle adicional (opcional)"
            value={form.observation}
            onChange={(e) => updateField('observation', e.target.value)}
          />
        </div>
      </div>

      <AppButton type="submit" variant="primary">
        Guardar Registro
      </AppButton>
    </form>
  )
}
