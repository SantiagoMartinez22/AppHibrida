import { useNavigate, useLocation } from 'react-router-dom'
import { FiHome, FiGrid, FiList } from 'react-icons/fi'
import { cn } from '@/lib/utils'
import { useMemo } from 'react'

type NavItem = {
  icon: React.ComponentType<{ className?: string }>
  path: string
  label: string
}

export function BottomNavBar() {
  const navigate = useNavigate()
  const location = useLocation()

  // Detect current role based on URL
  const isAdmin = location.pathname.startsWith('/admin')
  const rolePrefix = isAdmin ? '/admin' : '/guard'

  // Generate role-specific navigation items
  const navItems: NavItem[] = useMemo(() => [
    { icon: FiHome, path: '/', label: 'Inicio' },
    { icon: FiGrid, path: rolePrefix, label: 'Dashboard' },
    { icon: FiList, path: `${rolePrefix}/visitors`, label: 'Visitantes' },
  ], [rolePrefix])

  const isActive = (path: string) => {
    if (path.endsWith('/visitors')) return location.pathname.startsWith(path)
    if (path === rolePrefix) {
      return location.pathname === path || location.pathname === `${rolePrefix}/register`
    }
    return location.pathname === path
  }

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 flex items-center justify-around border-t bg-background py-3 safe-area-inset-bottom"
      role="navigation"
    >
      {navItems.map((item) => {
        const Icon = item.icon
        const active = isActive(item.path)
        return (
          <button
            key={item.label}
            type="button"
            onClick={() => navigate(item.path)}
            className={cn(
              'flex flex-col items-center gap-1 rounded-lg px-4 py-2 transition-colors',
              active ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
            )}
            aria-label={item.label}
            aria-current={active ? 'page' : undefined}
          >
            <Icon className={cn('h-6 w-6', active && 'stroke-[2.5]')} />
            <span className="text-xs">{item.label}</span>
          </button>
        )
      })}
    </nav>
  )
}
