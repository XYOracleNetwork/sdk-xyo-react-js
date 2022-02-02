import { ErrorDialog } from '@xylabs/sdk-react'

import { AuthActionTypes, AuthServiceId, useAuthState } from '../../contexts'
import { useAuthInterceptors } from '../../hooks'
import { AuthFooter } from './AuthFooter'
import { MapActiveAuthService } from './MapActiveService'

const backPayload = {
  payload: { activeAuthServiceId: AuthServiceId.None },
  type: AuthActionTypes.UpdateActiveAuthService,
}

const AuthServiceWrapper: React.FC = () => {
  const { state: authState, dispatch: authDispatch } = useAuthState()

  useAuthInterceptors(authState.apiDomain, authDispatch)

  const handleLogout = () => {
    authDispatch({ payload: {}, type: AuthActionTypes.Logout })
    authDispatch(backPayload)
  }

  const handleBack = () => authDispatch(backPayload)

  return (
    <>
      <MapActiveAuthService authState={authState} handleBack={handleBack} isLoading={authState.isLoading} />
      {authState.isLoggedIn && <AuthFooter handleLogout={handleLogout} />}
      {authState.authError && (
        <ErrorDialog
          title="Error Logging In"
          error={authState.authError}
          open={!!authState.authError}
          onAction={() => authDispatch({ payload: { authError: undefined }, type: AuthActionTypes.UpdateAuthError })}
        />
      )}
    </>
  )
}

export { AuthServiceWrapper }
