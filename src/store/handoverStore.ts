import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { ShiftHandover } from '@/types'
import { HANDOVERS_STORAGE_KEY } from '@/constants'

interface HandoverState {
    handovers: ShiftHandover[]
    deliverTurn: (payload: { fromUser: string; toUser?: string }) => ShiftHandover
}

export { HANDOVERS_STORAGE_KEY }

export const useHandoverStore = create<HandoverState>()(
    persist(
        (set) => ({
            handovers: [],
            deliverTurn: ({ fromUser, toUser }) => {
                const handover: ShiftHandover = {
                    id: crypto.randomUUID(),
                    fromUser: fromUser.trim(),
                    toUser: toUser?.trim() || undefined,
                    deliveredAt: new Date().toISOString(),
                }

                set((state) => ({
                    handovers: [handover, ...state.handovers],
                }))

                return handover
            },
        }),
        {
            name: HANDOVERS_STORAGE_KEY,
        }
    )
)
