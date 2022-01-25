import { ErrorDialog } from '@xylabs/sdk-react'

import { AuthActionTypes, AuthServiceId, useAuthState } from '../../../Contexts'
import AuthFooter from './AuthFooter'
import MapActiveAuthService from './MapActiveService'

const backPayload = {
  payload: { activeAuthServiceId: AuthServiceId.None },
  type: AuthActionTypes.UpdateActiveAuthService,
}

const AuthServiceWrapper: React.FC = () => {
  const { state: authState, dispatch: authDispatch } = useAuthState()

  const handleLogout = () => {
    authDispatch({ payload: {}, type: AuthActionTypes.Logout })
    authDispatch(backPayload)
  }

  const handleBack = () => authDispatch(backPayload)

  return (
    <>
      <MapActiveAuthService authState={authState} handleBack={handleBack} isLoading={authState.isLoading} />
      <AuthFooter handleLogout={handleLogout} isLoggedIn={authState.isLoggedIn} />
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

export default AuthServiceWrapper
