import { useTheme } from '@mui/material'
import { FlexGrowCol } from '@xylabs/react-flexbox'
import { AuthFooter, AuthService, AuthServiceProvider, useAuthState } from '@xyo-network/react-auth'

import { MapActiveAuthService } from './MapActiveService'

export interface AuthServiceWrapperProps {
  authServiceListOverride?: AuthService[]
}

const AuthServiceWrapper: React.FC<AuthServiceWrapperProps> = ({ authServiceListOverride }) => {
  const { state: authState, dispatch: authDispatch } = useAuthState()
  const theme = useTheme()

  return authState && authDispatch ? (
    <AuthServiceProvider authServiceListOverride={authServiceListOverride}>
      <MapActiveAuthService authState={authState} dispatch={authDispatch} />
      <FlexGrowCol width="100%" maxWidth={theme.breakpoints.values.sm}>
        {authState?.loggedInAccount && <AuthFooter />}
      </FlexGrowCol>
    </AuthServiceProvider>
  ) : null
}

export { AuthServiceWrapper }
