import { FiBookOpen } from 'react-icons/fi'
import { RoleSelector } from '@/components/organisms/RoleSelector'

export function Home() {
  return (
    <main className="min-h-screen bg-background flex flex-col items-center justify-center px-6">
      <div className="flex flex-col items-center gap-8 w-full max-w-sm">
        <div className="flex flex-col items-center gap-2">
          <div className="rounded-lg border bg-card p-4 shadow-sm mb-2 flex items-center justify-center">
            <FiBookOpen className="h-16 w-16 text-primary" aria-hidden />
          </div>
          <h1 className="text-2xl font-bold">VigiLog</h1>
          <p className="text-sm text-muted-foreground">Sistema de Registros</p>
        </div>
        <p className="text-sm text-muted-foreground text-center">
          Seleccione su rol para continuar
        </p>
        <RoleSelector />
      </div>
    </main>
  )
}
