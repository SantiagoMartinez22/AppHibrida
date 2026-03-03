import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { VisitorRecord } from '@/types'
import { VISITORS_STORAGE_KEY } from '@/constants'

interface VisitorState {
  visitors: VisitorRecord[]
  addVisitor: (record: Omit<VisitorRecord, 'id' | 'createdAt' | 'status' | 'checkoutAt'>) => VisitorRecord
  checkOutVisitor: (id: string) => void
}

export { VISITORS_STORAGE_KEY }

function migrateVisitor(v: VisitorRecord & { status?: VisitorRecord['status']; checkoutAt?: string }): VisitorRecord {
  return {
    ...v,
    status: v.status ?? 'active',
    checkoutAt: v.checkoutAt,
  }
}

export const useVisitorStore = create<VisitorState>()(
  persist(
    (set) => ({
      visitors: [],
      addVisitor: (record) => {
        const newRecord: VisitorRecord = {
          ...record,
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString(),
          status: 'active',
        }
        set((state) => ({
          visitors: [newRecord, ...state.visitors],
        }))
        return newRecord
      },
      checkOutVisitor: (id) => {
        set((state) => ({
          visitors: state.visitors.map((v) =>
            v.id === id ? { ...v, status: 'departed' as const, checkoutAt: new Date().toISOString() } : v
          ),
        }))
      },
    }),
    {
      name: VISITORS_STORAGE_KEY,
      migrate: (persistedState: unknown) => {
        const s = persistedState as { state?: { visitors?: unknown[] } }
        if (s?.state?.visitors) {
          s.state.visitors = s.state.visitors.map((v) => migrateVisitor(v as VisitorRecord))
        }
        return s
      },
    }
  )
)
