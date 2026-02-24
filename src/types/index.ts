export type VisitorStatus = 'active' | 'departed'

export interface VisitorRecord {
  id: string
  registeredBy: string
  visitorName: string
  destination: string
  observation?: string
  createdAt: string
  status: VisitorStatus
  checkoutAt?: string
}

export type Role = 'guard' | 'admin'
