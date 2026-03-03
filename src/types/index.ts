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

export interface AuthSession {
  role: Role
  username: string
  shiftStartedAt: string
}

export interface ShiftHandover {
  id: string
  fromUser: string
  toUser?: string
  deliveredAt: string
}

export interface AppStatusMessage {
  type: 'success' | 'error' | 'info'
  title: string
  description?: string
}
