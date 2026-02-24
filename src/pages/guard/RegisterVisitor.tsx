import { PageHeader } from '@/components/templates/PageHeader'
import { VisitorForm } from '@/components/organisms/VisitorForm'

export function RegisterVisitor() {
  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-lg mx-auto px-4 py-6">
        <PageHeader title="Registrar Visitante" />
        <VisitorForm />
      </div>
    </main>
  )
}
