import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiBookOpen, FiShield, FiUserCheck, FiX } from 'react-icons/fi'
import { AppButton } from '@/components/atoms/AppButton'
import { AppInput } from '@/components/atoms/AppInput'
import { Label } from '@/components/atoms/Label'
import { cn } from '@/lib/utils'
import { useAuthStore } from '@/store/authStore'
import type { Role } from '@/types'

function isValidRole(role: unknown): role is Role {
  return role === 'guard' || role === 'admin'
}

export function Home() {
  const navigate = useNavigate()
  const session = useAuthStore((s) => s.session)
  const statusMessage = useAuthStore((s) => s.statusMessage)
  const login = useAuthStore((s) => s.login)
  const clearStatusMessage = useAuthStore((s) => s.clearStatusMessage)

  const [role, setRole] = useState<Role>('guard')
  const [username, setUsername] = useState('')
  const [pin, setPin] = useState('')
  const [localError, setLocalError] = useState<string | null>(null)

  useEffect(() => {
    if (!session || !isValidRole(session.role)) return
    navigate(session.role === 'admin' ? '/admin' : '/guard', { replace: true })
  }, [session, navigate])

  const titleByRole = useMemo(() => {
    return role === 'guard' ? 'Ingreso Vigilante' : 'Ingreso Administrador'
  }, [role])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLocalError(null)
    const result = login({ role, username, pin })
    if (!result.ok) {
      setLocalError(result.error ?? 'No se pudo iniciar sesión')
      return
    }

    setPin('')
  }

  return (
    <main className="min-h-screen bg-background flex flex-col items-center justify-center px-6 py-8">
      <div className="flex flex-col items-center gap-6 w-full max-w-sm">
        <div className="flex flex-col items-center gap-2">
          <div className="rounded-2xl border bg-card p-4 shadow-sm mb-2 flex items-center justify-center">
            <FiBookOpen className="h-12 w-12 text-primary" aria-hidden />
          </div>
          <h1 className="text-2xl font-bold">VigiLog</h1>
          <p className="text-sm text-muted-foreground text-center">Registro digital de vigilancia</p>
        </div>

        {statusMessage && (
          <div
            className={cn(
              'w-full rounded-lg border p-3 text-sm',
              statusMessage.type === 'success' && 'border-emerald-400/30 bg-emerald-500/10 text-emerald-700',
              statusMessage.type === 'error' && 'border-destructive/40 bg-destructive/10 text-destructive',
              statusMessage.type === 'info' && 'border-primary/30 bg-primary/10 text-foreground'
            )}
            role="status"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-semibold">{statusMessage.title}</p>
                {statusMessage.description && (
                  <p className="text-xs mt-0.5 opacity-90">{statusMessage.description}</p>
                )}
              </div>
              <button
                type="button"
                className="opacity-70 hover:opacity-100"
                onClick={clearStatusMessage}
                aria-label="Cerrar mensaje"
              >
                <FiX className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="w-full rounded-2xl border bg-card p-4 shadow-sm space-y-4">
          <div className="grid grid-cols-2 gap-2">
            <AppButton
              type="button"
              variant={role === 'guard' ? 'primary' : 'outline'}
              className="rounded-lg py-2"
              onClick={() => setRole('guard')}
            >
              <FiShield className="h-4 w-4" />
              Vigilante
            </AppButton>
            <AppButton
              type="button"
              variant={role === 'admin' ? 'primary' : 'outline'}
              className="rounded-lg py-2"
              onClick={() => setRole('admin')}
            >
              <FiUserCheck className="h-4 w-4" />
              Admin
            </AppButton>
          </div>

          <p className="text-sm text-muted-foreground">{titleByRole}</p>

          <div className="space-y-2">
            <Label htmlFor="username">Usuario</Label>
            <AppInput
              id="username"
              placeholder="Ej: vigilante.noche"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="pin">PIN (4 dígitos)</Label>
            <AppInput
              id="pin"
              type="password"
              inputMode="numeric"
              maxLength={4}
              placeholder="••••"
              value={pin}
              onChange={(e) => setPin(e.target.value.replace(/\D/g, '').slice(0, 4))}
              autoComplete="current-password"
            />
          </div>

          {localError && <p className="text-sm text-destructive">{localError}</p>}

          <AppButton type="submit">Continuar</AppButton>
        </form>
      </div>
    </main>
  )
}
