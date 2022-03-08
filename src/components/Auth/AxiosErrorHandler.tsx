import { Typography } from '@mui/material'
import { FlexCol } from '@xylabs/sdk-react'
import { AxiosError } from 'axios'
import { useEffect } from 'react'

import { AuthActionTypes, AxiosLoggedError, useAuthState } from '../../contexts'
import { appThemeOptions } from '../../theme'
import { ApiLogEntry } from './AuthLogs'
import { AuthServiceWrapper } from './AuthServiceWrapper'
import { AuthThemeExtender } from './AuthThemeExtender'

const ReAuth: React.FC<AxiosErrorHandlerProps> = ({ apiError }) => {
  const { state: authState, dispatch: authDispatch } = useAuthState()

  const invalidRequest = apiError?.response?.status === 401 && !!apiError.config.headers?.['Authorization']

  useEffect(() => {
    // logout when invalid request and their was a loggedInAccount
    if (authState?.loggedInAccount && invalidRequest) {
      authDispatch?.({ payload: {}, type: AuthActionTypes.Logout })
    }
  }, [authDispatch, authState?.loggedInAccount, invalidRequest])

  // invalid request = apiError from bad badToken
  // reAuthenticate = apiError even without a loggedInAccount (i.e. retry attempt)
  if (invalidRequest || !authState?.loggedInAccount) {
    return (
      <AuthThemeExtender themeOptions={appThemeOptions}>
        <AuthServiceWrapper />
      </AuthThemeExtender>
    )
  } else {
    return <></>
  }
}

export interface AxiosErrorHandlerProps {
  apiError: AxiosError | undefined
  loginForm?: boolean
}

const AxiosErrorHandler: React.FC<AxiosErrorHandlerProps> = ({ apiError, loginForm = true, children, ...props }) => {
  if (apiError) {
    const loggedError = apiError as AxiosLoggedError
    loggedError.logged = loggedError.logged = new Date().toISOString()

    return (
      <FlexCol alignItems="start" {...props}>
        <Typography variant="h5" color="error" my={1}>
          Error Making Request
        </Typography>
        <ApiLogEntry call={loggedError} />
        {loginForm && (
          <FlexCol my={2} width="100%">
            <ReAuth apiError={apiError} />
          </FlexCol>
        )}
      </FlexCol>
    )
  } else {
    return <>{children}</>
  }
}

export { AxiosErrorHandler }
