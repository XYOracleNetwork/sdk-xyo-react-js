import { ButtonEx, ButtonExProps } from '@xylabs/sdk-react'
import { AuthService, AuthServiceId, useAuthService } from '@xyo-network/react-auth'
import { Dispatch, SetStateAction } from 'react'

export interface AuthServiceButtonProps extends ButtonExProps {
  service: AuthService
  setActiveAuthServiceId?: Dispatch<SetStateAction<AuthServiceId>>
}

export const AuthServiceButton: React.FC<AuthServiceButtonProps> = ({ service, ...props }) => {
  const { id, title } = service
  const { setActiveAuthServiceId } = useAuthService()

  return (
    <ButtonEx onClick={() => setActiveAuthServiceId?.(id)} key={id} variant="outlined" {...props}>
      {title}
    </ButtonEx>
  )
}
