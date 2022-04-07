import { ButtonEx, ButtonExProps } from '@xylabs/sdk-react'

import { AuthActionType, AuthService, useAuthState } from '../../../contexts'

export interface AuthServiceButtonProps extends ButtonExProps {
  service: AuthService
}

export const AuthServiceButton: React.FC<AuthServiceButtonProps> = ({ service, ...props }) => {
  const { id, title } = service
  const { dispatch } = useAuthState()
  const payload = { payload: { activeAuthServiceId: id }, type: AuthActionType.UpdateActiveAuthService }

  return (
    <ButtonEx onClick={() => dispatch?.(payload)} key={id} variant="outlined" {...props}>
      {title}
    </ButtonEx>
  )
}
