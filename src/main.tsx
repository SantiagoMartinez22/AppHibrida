import { Component, StrictMode, type ErrorInfo, type ReactNode } from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster } from 'sonner'
import './index.scss'
import App from './App'
import { initTheme } from '@/lib/theme'
import { AUTH_STORAGE_KEY } from '@/store/authStore'
import { VISITORS_STORAGE_KEY } from '@/store/visitorStore'
import { HANDOVERS_STORAGE_KEY } from '@/store/handoverStore'

const PERSIST_KEYS = [AUTH_STORAGE_KEY, VISITORS_STORAGE_KEY, HANDOVERS_STORAGE_KEY]

function repairPersistedStorage(): void {
  for (const key of PERSIST_KEYS) {
    try {
      const rawValue = window.localStorage.getItem(key)
      if (!rawValue) continue

      JSON.parse(rawValue)
    } catch {
      window.localStorage.removeItem(key)
    }
  }
}

repairPersistedStorage()
initTheme()

interface AppErrorBoundaryState {
  hasError: boolean
  message: string
}

class AppErrorBoundary extends Component<{ children: ReactNode }, AppErrorBoundaryState> {
  state: AppErrorBoundaryState = {
    hasError: false,
    message: '',
  }

  static getDerivedStateFromError(error: Error): AppErrorBoundaryState {
    return {
      hasError: true,
      message: error?.message ?? 'Error no identificado',
    }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('[VigiLog runtime error]', error, errorInfo)
  }

  private handleReset = (): void => {
    const keys = ['vigilog-auth', 'vigilog-visitors', 'vigilog-handovers']
    keys.forEach((key) => window.localStorage.removeItem(key))
    window.location.href = '/'
  }

  render(): ReactNode {
    if (!this.state.hasError) return this.props.children

    return (
      <main className="min-h-screen bg-background text-foreground flex items-center justify-center px-6">
        <section className="w-full max-w-md rounded-xl border bg-card p-5 shadow-sm space-y-3">
          <h1 className="text-lg font-semibold">Se detectó un error de ejecución</h1>
          <p className="text-sm text-muted-foreground">
            La aplicación evitó el pantallazo blanco y registró el error en consola.
          </p>
          <pre className="text-xs rounded-md bg-muted/50 p-3 overflow-auto whitespace-pre-wrap break-words">
            {this.state.message}
          </pre>
          <div className="flex gap-2">
            <button
              type="button"
              className="rounded-md border px-3 py-2 text-sm hover:bg-accent"
              onClick={() => window.location.reload()}
            >
              Reintentar
            </button>
            <button
              type="button"
              className="rounded-md bg-primary px-3 py-2 text-sm text-primary-foreground hover:bg-primary/90"
              onClick={this.handleReset}
            >
              Limpiar sesión y reiniciar
            </button>
          </div>
        </section>
      </main>
    )
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppErrorBoundary>
      <App />
    </AppErrorBoundary>
    <Toaster richColors position="top-center" />
  </StrictMode>,
)
