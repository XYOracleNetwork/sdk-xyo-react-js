import { useTheme } from '@mui/material'
import { FlexGrowCol } from '@xylabs/sdk-react'
import { AuthActionType, AuthFooter, AuthServiceId, useAuthState } from '@xyo-network/react-auth'

import { MapActiveAuthService } from './MapActiveService'

const backPayload = {
  payload: { activeAuthServiceId: AuthServiceId.None },
  type: AuthActionType.UpdateActiveAuthService,
}

const AuthServiceWrapper: React.FC = () => {
  const { state: authState, dispatch: authDispatch } = useAuthState()
  const theme = useTheme()

  const handleLogout = () => {
    authDispatch?.({ payload: {}, type: AuthActionType.Logout })
    authDispatch?.(backPayload)
  }

  const handleBack = () => authDispatch?.(backPayload)

  return authState && authDispatch ? (
    <>
      <MapActiveAuthService authState={authState} dispatch={authDispatch} handleBack={handleBack} />
      <FlexGrowCol width="100%" maxWidth={theme.breakpoints.values.sm}>
        {authState?.loggedInAccount && <AuthFooter handleLogout={handleLogout} />}
      </FlexGrowCol>
    </>
  ) : null
}

export { AuthServiceWrapper }
