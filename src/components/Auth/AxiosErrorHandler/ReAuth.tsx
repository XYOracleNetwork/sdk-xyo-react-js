import { useEffect } from 'react'

import { AuthActionTypes, useAuthState } from '../../../contexts'
import { appThemeOptions } from '../../../theme'
import { AuthServiceWrapper } from '../AuthServiceWrapper'
import { AuthThemeExtender } from '../AuthThemeExtender'
import { AxiosErrorHandlerProps } from './AxiosErrorHandler'

const ReAuth: React.FC<AxiosErrorHandlerProps> = ({ apiError, loginForm = true }) => {
  const { state: authState, dispatch: authDispatch } = useAuthState()

  const invalidRequest = apiError?.response?.status === 401 && !!apiError.config.headers?.['Authorization']

  useEffect(() => {
    // logout when invalid request and their was a loggedInAccount
    if (authState?.loggedInAccount && invalidRequest) {
      authDispatch?.({ payload: { reAuthenticate: true }, type: AuthActionTypes.Logout })
    }
  }, [authDispatch, authState?.loggedInAccount, invalidRequest])

  // invalid request = apiError from bad badToken
  // no loggedInAccount = apiError even without a loggedInAccount (i.e. retry attempt)
  if ((invalidRequest || !authState?.loggedInAccount) && loginForm) {
    return (
      <AuthThemeExtender themeOptions={appThemeOptions}>
        <AuthServiceWrapper />
      </AuthThemeExtender>
    )
  } else {
    return <></>
  }
}

export { ReAuth }
