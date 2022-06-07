import { useTheme } from '@mui/material'
import { FlexGrowCol } from '@xylabs/sdk-react'
import { AuthActionType, AuthFooter, AuthServiceId, useAuthState } from '@xyo-network/react-auth'
import { useState } from 'react'

import { MapActiveAuthService } from './MapActiveService'

const AuthServiceWrapper: React.FC = () => {
  const { state: authState, dispatch: authDispatch } = useAuthState()
  const theme = useTheme()
  const [activeAuthServiceId, setActiveAuthServiceId] = useState(AuthServiceId.None)

  const handleLogout = () => {
    authDispatch?.({ payload: {}, type: AuthActionType.Logout })
  }

  const handleBack = () => setActiveAuthServiceId(AuthServiceId.None)

  return authState && authDispatch ? (
    <>
      <MapActiveAuthService
        authState={authState}
        dispatch={authDispatch}
        handleBack={handleBack}
        setActiveAuthServiceId={setActiveAuthServiceId}
        activeAuthServiceId={activeAuthServiceId}
      />
      <FlexGrowCol width="100%" maxWidth={theme.breakpoints.values.sm}>
        {authState?.loggedInAccount && <AuthFooter handleLogout={handleLogout} />}
      </FlexGrowCol>
    </>
  ) : null
}

export { AuthServiceWrapper }
