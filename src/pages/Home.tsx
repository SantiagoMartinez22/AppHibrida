import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiMoon, FiShield, FiSun, FiUserCheck, FiX } from 'react-icons/fi'
import { AppButton } from '@/components/atoms/AppButton'
import { AppInput } from '@/components/atoms/AppInput'
import { Label } from '@/components/atoms/Label'
import { useTheme } from '@/hooks/useTheme'
import { cn } from '@/lib/utils'
import { useAuthStore } from '@/store/authStore'
import { isValidRole } from '@/lib/visitor-utils'
import type { Role } from '@/types'

export function Home() {
  const navigate = useNavigate()
  const session = useAuthStore((s) => s.session)
  const statusMessage = useAuthStore((s) => s.statusMessage)
  const login = useAuthStore((s) => s.login)
  const clearStatusMessage = useAuthStore((s) => s.clearStatusMessage)
  const { isDark, toggleTheme } = useTheme()

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

  const usernamePlaceholder = useMemo(() => {
    return role === 'guard' ? 'Ej: vigilante.noche' : 'Ej: admin.principal'
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
    <main className="flex min-h-screen items-center justify-center bg-background px-4 py-8 sm:px-6">
      <button
        type="button"
        onClick={toggleTheme}
        className="fixed right-4 top-4 inline-flex items-center gap-2 rounded-full border bg-card px-3 py-2 text-xs font-semibold text-foreground shadow-sm hover:bg-accent/70"
        aria-label={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
      >
        {isDark ? <FiSun className="h-4 w-4" /> : <FiMoon className="h-4 w-4" />}
        {isDark ? 'Claro' : 'Oscuro'}
      </button>

      <div className="grid w-full max-w-5xl justify-items-center gap-8 md:grid-cols-2 md:items-center md:justify-items-stretch">
        <div className="hidden md:flex flex-col gap-4">
          <div className="inline-flex w-fit items-center gap-3 rounded-full border bg-primary/10 px-4 py-2 text-base font-semibold text-primary">
            <img
              src="/caballero-armadura-protegido-escudo_1057-219168.avif"
              alt="Logo VigiLog"
              className="h-10 w-10 rounded-full object-cover"
            />
            VigiLog
          </div>
          <h1 className="text-4xl font-bold leading-tight">Registro de vigilancia digital</h1>
          <p className="text-base text-muted-foreground max-w-md">
            Controla ingresos, consulta visitantes y realiza entrega de turno con un flujo claro para vigilante y administrador.
          </p>
        </div>

        <div className="mx-auto flex w-full max-w-sm flex-col items-center gap-6 md:mx-0 md:justify-self-end">
          <div className="flex w-full flex-col items-center gap-2 text-center md:hidden">
            <div className="mb-2 inline-flex items-center gap-2.5 rounded-full border bg-primary/10 px-4 py-2 text-base font-semibold text-primary">
              <img
                src="/caballero-armadura-protegido-escudo_1057-219168.avif"
                alt="Logo VigiLog"
                className="h-10 w-10 rounded-full object-cover"
              />
              VigiLog
            </div>
            <h1 className="text-2xl font-bold">VigiLog</h1>
            <p className="text-sm text-muted-foreground text-center">Registro digital de vigilancia</p>
          </div>

          <div className="mx-auto w-full space-y-4 rounded-2xl border bg-card p-4 shadow-sm ring-1 ring-primary/10">
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

            <form onSubmit={handleSubmit} className="w-full space-y-4">
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

              <p className="text-center text-sm text-muted-foreground md:text-left">{titleByRole}</p>

              <div className="space-y-2">
                <Label htmlFor="username">Usuario</Label>
                <AppInput
                  id="username"
                  placeholder={usernamePlaceholder}
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

              {localError && <p className="text-center text-sm text-destructive md:text-left">{localError}</p>}

              <AppButton type="submit">Continuar</AppButton>
            </form>
          </div>
        </div>
      </div>
    </main>
  )
}
