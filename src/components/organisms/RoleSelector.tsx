import { useNavigate } from 'react-router-dom'
import { AppButton } from '@/components/atoms/AppButton'

export function RoleSelector() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col gap-3 w-full max-w-sm">
      <AppButton variant="primary" onClick={() => navigate('/guard')}>
        Entrar como Vigilante
      </AppButton>
      <AppButton variant="outline" onClick={() => navigate('/admin')}>
        Entrar como Administrador
      </AppButton>
    </div>
  )
}
