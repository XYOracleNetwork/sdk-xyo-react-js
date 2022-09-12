import { FlexBoxProps, FlexCol } from '@xylabs/react-flexbox'
import { AuthFooter, AuthService, AuthServiceProvider, useAuthState } from '@xyo-network/react-auth'
import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

import { MapActiveAuthService } from './MapActiveService'

export interface AuthServiceWrapperProps extends FlexBoxProps {
  authServiceListOverride?: AuthService[]
  hideLogout?: boolean
}

const AuthServiceWrapper: React.FC<AuthServiceWrapperProps> = ({ authServiceListOverride, hideLogout, ...props }) => {
  const { state: authState, dispatch: authDispatch } = useAuthState()
  const [params, setParams] = useSearchParams()

  useEffect(() => {
    return () => {
      if (params.has('returnUrl')) {
        params.delete('returnUrl')
        setParams(params)
      }
    }
  }, [params, setParams])

  return authState && authDispatch ? (
    <AuthServiceProvider authServiceListOverride={authServiceListOverride}>
      <FlexCol rowGap={2} {...props}>
        <MapActiveAuthService authState={authState} dispatch={authDispatch} rowGap={2} />
        {authState?.loggedInAccount && !hideLogout && <AuthFooter />}
      </FlexCol>
    </AuthServiceProvider>
  ) : null
}

export { AuthServiceWrapper }
