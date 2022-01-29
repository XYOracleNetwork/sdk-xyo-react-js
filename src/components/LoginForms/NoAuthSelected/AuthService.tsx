import { ButtonEx } from '@xylabs/sdk-react'

import { AuthActionTypes, IAuthService, useAuthState } from '../../../contexts'

interface AuthServiceProps {
  service: IAuthService
}

const AuthService: React.FC<AuthServiceProps> = ({ service }) => {
  const { id, title } = service
  const { dispatch } = useAuthState()
  const payload = { payload: { activeAuthServiceId: id }, type: AuthActionTypes.UpdateActiveAuthService }

  return (
    <ButtonEx onClick={() => dispatch(payload)} key={id} variant="outlined">
      {title}
    </ButtonEx>
  )
}

export { AuthService }
