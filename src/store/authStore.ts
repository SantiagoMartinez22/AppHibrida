import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { AppStatusMessage, AuthSession, Role } from '@/types'
import { AUTH_STORAGE_KEY, PIN_REGEX } from '@/constants'
import { isValidRole } from '@/lib/visitor-utils'

interface LoginInput {
    role: Role
    username: string
    pin: string
}

interface AuthState {
    session: AuthSession | null
    statusMessage: AppStatusMessage | null
    login: (input: LoginInput) => { ok: boolean; error?: string }
    logout: (message?: AppStatusMessage) => void
    clearStatusMessage: () => void
}

export { AUTH_STORAGE_KEY }

function validateLoginInput(input: LoginInput): string | null {
    if (!input.username.trim()) return 'El usuario es obligatorio'
    if (!PIN_REGEX.test(input.pin.trim())) return 'El PIN debe tener 4 dígitos'
    return null
}

function sanitizeSession(session: unknown): AuthSession | null {
    if (!session || typeof session !== 'object') return null

    const candidate = session as Partial<AuthSession>
    if (!isValidRole(candidate.role)) return null
    if (!candidate.username || typeof candidate.username !== 'string') return null
    if (!candidate.shiftStartedAt || typeof candidate.shiftStartedAt !== 'string') return null

    return {
        role: candidate.role,
        username: candidate.username,
        shiftStartedAt: candidate.shiftStartedAt,
    }
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            session: null,
            statusMessage: null,
            login: ({ role, username, pin }) => {
                const validationError = validateLoginInput({ role, username, pin })
                if (validationError) {
                    set({
                        statusMessage: {
                            type: 'error',
                            title: 'No se pudo iniciar sesión',
                            description: validationError,
                        },
                    })
                    return { ok: false, error: validationError }
                }

                const normalizedUser = username.trim()
                set({
                    session: {
                        role,
                        username: normalizedUser,
                        shiftStartedAt: new Date().toISOString(),
                    },
                    statusMessage: {
                        type: 'success',
                        title: 'Ingreso exitoso',
                        description: `Bienvenido, ${normalizedUser}`,
                    },
                })
                return { ok: true }
            },
            logout: (message) => {
                set({
                    session: null,
                    statusMessage: message ?? null,
                })
            },
            clearStatusMessage: () => set({ statusMessage: null }),
        }),
        {
            name: AUTH_STORAGE_KEY,
            migrate: (persistedState: unknown) => {
                const state = persistedState as {
                    state?: {
                        session?: unknown
                        statusMessage?: AppStatusMessage | null
                    }
                }

                if (!state?.state) return state

                state.state.session = sanitizeSession(state.state.session)

                if (state.state.session === null && state.state.statusMessage?.type === 'success') {
                    state.state.statusMessage = null
                }

                return state
            },
        }
    )
)
