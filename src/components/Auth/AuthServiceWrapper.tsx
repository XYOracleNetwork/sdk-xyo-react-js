import { AuthActionTypes, AuthServiceId, useAuthState } from '../../contexts'
import { AuthFooter } from './AuthFooter'
import { MapActiveAuthService } from './MapActiveService'

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
      <MapActiveAuthService authState={authState} dispatch={authDispatch} handleBack={handleBack} />
      {authState.isLoggedIn && <AuthFooter handleLogout={handleLogout} />}
    </>
  )
}

export { AuthServiceWrapper }
