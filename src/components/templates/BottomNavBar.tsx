import { useNavigate, useLocation } from 'react-router-dom'
import { FiHome, FiList, FiBookOpen, FiLogOut } from 'react-icons/fi'
import { cn } from '@/lib/utils'
import { useMemo } from 'react'
import { useAuthStore } from '@/store/authStore'
import { toast } from 'sonner'

type NavItem = {
  icon: React.ComponentType<{ className?: string }>
  path?: string
  onClick?: () => void
  label: string
}

export function BottomNavBar() {
  const navigate = useNavigate()
  const location = useLocation()
  const logout = useAuthStore((s) => s.logout)

  // Detect current role based on URL
  const isAdmin = location.pathname.startsWith('/admin')
  const rolePrefix = isAdmin ? '/admin' : '/guard'

  const handleLogout = () => {
    toast('Cerrar sesión', {
      description: '¿Seguro que quiere cerrar sesión?',
      action: {
        label: 'Sí, salir',
        onClick: () => {
          logout({
            type: 'info',
            title: 'Sesión cerrada',
            description: 'Hasta pronto',
          })
          navigate('/', { replace: true })
        },
      },
      cancel: {
        label: 'Cancelar',
        onClick: () => undefined,
      },
    })
  }

  // Generate role-specific navigation items
  const navItems: NavItem[] = useMemo(() => [
    { icon: FiHome, path: '/', label: 'Inicio' },
    { icon: FiList, path: `${rolePrefix}/visitors`, label: 'Visitantes' },
    { icon: FiLogOut, onClick: handleLogout, label: 'Salir' },
  ], [rolePrefix])

  const isActive = (path?: string) => {
    if (!path) return false
    if (path.endsWith('/visitors')) return location.pathname.startsWith(path)
    return location.pathname === path
  }

  return (
    <>
      <nav
        className="fixed bottom-0 left-0 right-0 border-t bg-background/95 backdrop-blur md:hidden safe-area-inset-bottom"
        role="navigation"
      >
        <div className="mx-auto max-w-lg bg-gradient-to-t from-primary/5 to-transparent px-3 py-2">
          <div className="mb-2 flex justify-center">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="inline-flex items-center gap-2 rounded-full border bg-card px-3 py-1 text-xs font-medium text-foreground"
              aria-label="Ir al inicio"
            >
              <FiBookOpen className="h-4 w-4 text-primary" aria-hidden />
              VigiLog
            </button>
          </div>
          <div className="grid grid-cols-3 gap-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const active = isActive(item.path)
              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => item.onClick ? item.onClick() : navigate(item.path!)}
                  className={cn(
                    'flex flex-col items-center gap-1 rounded-lg px-2 py-2 text-xs transition-colors',
                    active
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:bg-accent/60 hover:text-foreground'
                  )}
                  aria-label={item.label}
                  aria-current={active ? 'page' : undefined}
                >
                  <Icon className={cn('h-5 w-5', active && 'stroke-[2.5]')} />
                  <span>{item.label}</span>
                </button>
              )
            })}
          </div>
        </div>
      </nav>

      <nav
        className="hidden md:block fixed top-0 left-0 right-0 border-b bg-background/95 backdrop-blur"
        role="navigation"
      >
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between bg-gradient-to-r from-primary/5 via-transparent to-accent/40 px-6 py-3">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 rounded-full border bg-card px-3 py-1.5 text-sm font-semibold text-foreground"
            aria-label="Ir al inicio"
          >
            <FiBookOpen className="h-4 w-4 text-primary" aria-hidden />
            VigiLog
          </button>

          <div className="flex items-center gap-2">
            {navItems.map((item) => {
              const Icon = item.icon
              const active = isActive(item.path)
              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => item.onClick ? item.onClick() : navigate(item.path!)}
                  className={cn(
                    'inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                    active
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:bg-accent/70 hover:text-foreground'
                  )}
                  aria-label={item.label}
                  aria-current={active ? 'page' : undefined}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </button>
              )
            })}
          </div>
        </div>
      </nav>
    </>
  )
}
