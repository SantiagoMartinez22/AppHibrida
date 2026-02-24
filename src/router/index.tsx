import { Routes, Route, Navigate } from 'react-router-dom'
import { Home } from '@/pages/Home'
import { GuardDashboard } from '@/pages/guard/GuardDashboard'
import { RegisterVisitor } from '@/pages/guard/RegisterVisitor'
import { VisitorListPage } from '@/pages/guard/VisitorListPage'
import { VisitorDetail } from '@/pages/guard/VisitorDetail'

export function AppRouter(): React.ReactElement {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/guard" element={<GuardDashboard />} />
      <Route path="/guard/register" element={<RegisterVisitor />} />
      <Route path="/guard/visitors" element={<VisitorListPage />} />
      <Route path="/guard/visitors/:id" element={<VisitorDetail />} />
      <Route path="/admin" element={<div className="p-4">Admin (próximamente)</div>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
