import { useNavigate, useLocation } from 'react-router-dom'
import { FiHome, FiList, FiBookOpen, FiLogOut, FiShield, FiUserCheck } from 'react-icons/fi'
import { cn } from '@/lib/utils'
import { useMemo, useState } from 'react'
import { useAuthStore } from '@/store/authStore'
import { ConfirmModal } from '@/components/molecules/ConfirmModal'

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
  const session = useAuthStore((s) => s.session)
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false)

  // Detect current role based on URL
  const isAdmin = location.pathname.startsWith('/admin')
  const rolePrefix = isAdmin ? '/admin' : '/guard'
  const roleLabel = isAdmin ? 'Administrador' : 'Vigilante'

  const handleLogout = () => {
    setIsLogoutModalOpen(true)
  }

  const confirmLogout = () => {
    logout({
      type: 'info',
      title: 'Sesión cerrada',
      description: isAdmin
        ? 'Hasta pronto'
        : 'Cierre de sesión sin entrega de turno',
    })
    setIsLogoutModalOpen(false)
    navigate('/', { replace: true })
  }

  // Generate role-specific navigation items
  const navItems: NavItem[] = useMemo(() => [
    { icon: FiHome, path: rolePrefix, label: 'Inicio' },
    { icon: FiList, path: `${rolePrefix}/visitors`, label: 'Visitantes' },
    { icon: FiLogOut, onClick: handleLogout, label: 'Salir' },
  ], [rolePrefix])

  const isActive = (path?: string) => {
    if (!path) return false
    if (path === rolePrefix) {
      return location.pathname === path || location.pathname === `${rolePrefix}/register`
    }
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
        className="fixed left-0 right-0 top-0 hidden border-b bg-gradient-to-r from-primary/15 via-background/95 to-accent/70 backdrop-blur md:block"
        role="navigation"
      >
        <div className="flex w-full items-center justify-between px-6 py-3 lg:px-10">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/90 px-3 py-1.5 text-sm font-semibold text-foreground shadow-sm"
            aria-label="Ir al inicio"
          >
            <FiBookOpen className="h-4 w-4 text-primary" aria-hidden />
            VigiLog Control
          </button>

          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1 rounded-full border border-border/70 bg-card/85 px-2.5 py-1 text-xs font-semibold text-foreground">
              {isAdmin ? <FiUserCheck className="h-3.5 w-3.5 text-primary" aria-hidden /> : <FiShield className="h-3.5 w-3.5 text-primary" aria-hidden />}
              {roleLabel}
              {session?.username ? ` · ${session.username}` : ''}
            </span>
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
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'text-foreground/80 hover:bg-card/80 hover:text-foreground'
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

      <ConfirmModal
        open={isLogoutModalOpen}
        title="Cerrar sesión"
        description={isAdmin
          ? '¿Seguro que quiere cerrar sesión?'
          : '¿Seguro que quiere cerrar sesión sin entregar turno?'}
        confirmLabel="Sí, salir"
        cancelLabel="Cancelar"
        onConfirm={confirmLogout}
        onCancel={() => setIsLogoutModalOpen(false)}
      />
    </>
  )
}
