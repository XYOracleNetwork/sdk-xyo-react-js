import { FlexBoxProps, FlexCol } from '@xylabs/sdk-react'
import { XyoApiResponse } from '@xyo-network/sdk-xyo-client-js'
import { useEffect } from 'react'

import { AuthActionType, AuthThemeExtender, useAuthState } from '../../../auth'
import { appThemeOptions } from '../../../theme'
import { AuthServiceWrapper } from '../AuthServiceWrapper'

export interface ReAuthProps extends FlexBoxProps {
  apiFailure: XyoApiResponse
}

export const ReAuth: React.FC<ReAuthProps> = ({ apiFailure, ...props }) => {
  const { state: authState, dispatch: authDispatch } = useAuthState()

  const invalidRequest = apiFailure.status === 401 && apiFailure.config.headers?.['Authorization']

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
