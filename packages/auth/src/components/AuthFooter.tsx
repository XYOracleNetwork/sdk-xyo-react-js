import { ButtonEx } from '@xylabs/react-button'
import { memo } from 'react'

import { AuthActionType, AuthServiceId, useAuthService, useAuthState } from '../contexts'

const AuthFooterComponent: React.FC = () => {
  const { dispatch: authDispatch } = useAuthState()
  const { setActiveAuthServiceId } = useAuthService()

  const handleLogout = () => {
    setActiveAuthServiceId?.(AuthServiceId.None)
    authDispatch?.({ payload: {}, type: AuthActionType.Logout })
  }
  return (
    <ButtonEx variant="outlined" onClick={handleLogout}>
      Logout
    </ButtonEx>
  )
}

export const AuthFooter = memo(AuthFooterComponent)
