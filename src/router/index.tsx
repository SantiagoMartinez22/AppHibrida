import { Routes, Route, Navigate } from 'react-router-dom'
import { Home } from '@/pages/Home'
import { GuardDashboard } from '@/pages/guard/GuardDashboard'
import { RegisterVisitor } from '@/pages/guard/RegisterVisitor'
import { VisitorListPage } from '@/pages/guard/VisitorListPage'
import { VisitorDetail } from '@/pages/guard/VisitorDetail'
import { AdminDashboard } from '@/pages/admin/AdminDashboard'
import { AdminVisitorListPage } from '@/pages/admin/AdminVisitorListPage'
import { AdminVisitorDetail } from '@/pages/admin/AdminVisitorDetail'
import { useAuthStore } from '@/store/authStore'
import type { Role } from '@/types'

function isValidRole(role: unknown): role is Role {
  return role === 'guard' || role === 'admin'
}

function RequireRole({ role, children }: { role: Role; children: React.ReactElement }) {
  const session = useAuthStore((s) => s.session)

  if (!session || !isValidRole(session.role)) return <Navigate to="/" replace />
  if (session.role !== role) {
    return <Navigate to={session.role === 'admin' ? '/admin' : '/guard'} replace />
  }

  return children
}

export function AppRouter(): React.ReactElement {
  const session = useAuthStore((s) => s.session)
  const dashboardPath = session && isValidRole(session.role)
    ? session.role === 'admin' ? '/admin' : '/guard'
    : '/'

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/guard" element={<RequireRole role="guard"><GuardDashboard /></RequireRole>} />
      <Route path="/guard/register" element={<RequireRole role="guard"><RegisterVisitor /></RequireRole>} />
      <Route path="/guard/visitors" element={<RequireRole role="guard"><VisitorListPage /></RequireRole>} />
      <Route path="/guard/visitors/:id" element={<RequireRole role="guard"><VisitorDetail /></RequireRole>} />
      <Route path="/admin" element={<RequireRole role="admin"><AdminDashboard /></RequireRole>} />
      <Route path="/admin/visitors" element={<RequireRole role="admin"><AdminVisitorListPage /></RequireRole>} />
      <Route path="/admin/visitors/:id" element={<RequireRole role="admin"><AdminVisitorDetail /></RequireRole>} />
      <Route path="/dashboard" element={<Navigate to={dashboardPath} replace />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
