import type { Role } from '@/types'

/**
 * Type guard to check if a value is a valid Role
 */
export function isValidRole(role: unknown): role is Role {
  return role === 'guard' || role === 'admin'
}
