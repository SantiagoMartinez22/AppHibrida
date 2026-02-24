import { useNavigate, useLocation } from 'react-router-dom'
import { FiHome, FiGrid, FiList } from 'react-icons/fi'
import { cn } from '@/lib/utils'

type NavItem = {
  icon: React.ComponentType<{ className?: string }>
  path: string
  label: string
}

const NAV_ITEMS: NavItem[] = [
  { icon: FiHome, path: '/', label: 'Inicio' },
  { icon: FiGrid, path: '/guard', label: 'Dashboard' },
  { icon: FiList, path: '/guard/visitors', label: 'Visitantes' },
]

export function BottomNavBar() {
  const navigate = useNavigate()
  const location = useLocation()

  const isActive = (path: string) => {
    if (path === '/guard/visitors') return location.pathname.startsWith('/guard/visitors')
    if (path === '/guard') return location.pathname === '/guard' || location.pathname === '/guard/register'
    return location.pathname === path
  }

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 flex items-center justify-around border-t bg-background py-3 safe-area-inset-bottom"
      role="navigation"
    >
      {NAV_ITEMS.map((item) => {
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
