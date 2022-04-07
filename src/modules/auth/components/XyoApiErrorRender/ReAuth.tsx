import { FlexCol } from '@xylabs/sdk-react'
import { useEffect } from 'react'

import { appThemeOptions } from '../../../../theme'
import { AuthActionType, useAuthState } from '../../contexts'
import { AuthServiceWrapper } from '../AuthServiceWrapper'
import { AuthThemeExtender } from '../AuthThemeExtender'
import { AxiosErrorRenderProps } from './Props'

const ReAuth: React.FC<AxiosErrorRenderProps> = ({ apiError, ...props }) => {
  const { state: authState, dispatch: authDispatch } = useAuthState()

  const invalidRequest = apiError?.response?.status === 401 && !!apiError.config.headers?.['Authorization']

  useEffect(() => {
    // logout when invalid request and their was a loggedInAccount
    if (authState?.loggedInAccount && invalidRequest) {
      authDispatch?.({ payload: { reAuthenticate: true }, type: AuthActionType.Logout })
    }
  }, [authDispatch, authState?.loggedInAccount, invalidRequest])

  // invalid request = apiError from bad badToken
  // no loggedInAccount = apiError even without a loggedInAccount (i.e. retry attempt)
  if (invalidRequest || !authState?.loggedInAccount) {
    return (
      <FlexCol {...props}>
        <AuthThemeExtender themeOptions={appThemeOptions}>
          <AuthServiceWrapper />
        </AuthThemeExtender>
      </FlexCol>
    )
  } else {
    return null
  }
}

export { ReAuth }
