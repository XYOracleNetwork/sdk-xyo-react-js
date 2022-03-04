import { Typography } from '@mui/material'
import { FlexCol } from '@xylabs/sdk-react'
import { AxiosError } from 'axios'
import { useEffect } from 'react'

import { AuthActionTypes, useAuthState } from '../../contexts'
import { appThemeOptions } from '../../theme'
import { AuthServiceWrapper } from './AuthServiceWrapper'
import { AuthThemeExtender } from './AuthThemeExtender'

const Status: React.FC<AxiosErrorHandlerProps> = ({ apiError }) => {
  if (apiError?.response?.status) {
    return (
      <>
        <Typography variant="body1" color="error">
          Status: {apiError?.response?.status} {apiError?.response.statusText}
        </Typography>
        <Typography variant="body1" color="error">
          Message: {apiError?.message}
        </Typography>
      </>
    )
  } else {
    return <></>
  }
}

const ReAuth: React.FC<AxiosErrorHandlerProps> = ({ apiError }) => {
  const reAuth = apiError?.response?.status === 401 && !!apiError.config.headers?.['Authorization']
  const { state: authState, dispatch: authDispatch } = useAuthState()

  useEffect(() => {
    if (authState?.loggedInAccount) {
      authDispatch?.({ payload: {}, type: AuthActionTypes.Logout })
    }
  }, [authDispatch, authState?.loggedInAccount])

  if (reAuth) {
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
    return (
      <FlexCol alignItems="start" {...props}>
        <Typography variant="h5" color="error" my={1}>
          Error Making Request
        </Typography>
        <Status apiError={apiError} />
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
