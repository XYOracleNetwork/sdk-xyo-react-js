import { Typography } from '@mui/material'
import { ButtonEx, FlexRow, LinkEx } from '@xylabs/sdk-react'
import { AxiosError } from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { AuthActionTypes, useAuthState } from '../../contexts'

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
  const navigate = useNavigate()
  const [reAuth, setReAuth] = useState(false)
  const { dispatch: authDispatch } = useAuthState()

  const handleReAuth = () => {
    navigate('/login', {
      state: {
        from: { pathname: window.location.pathname },
        message: `Login to return to '${window.location.pathname}'`,
      },
    })
    authDispatch?.({ payload: {}, type: AuthActionTypes.Logout })
  }

  useEffect(() => {
    if (apiError?.response?.status === 401 && !!apiError.config.headers?.['Authorization']) {
      setReAuth(true)
    }
  }, [apiError])

  if (reAuth) {
    return (
      <LinkEx onClick={() => handleReAuth()}>
        <ButtonEx variant="outlined">Re-Login</ButtonEx>
      </LinkEx>
    )
  } else {
    return <></>
  }
}

interface AxiosErrorHandlerProps {
  apiError: AxiosError | undefined
}

const AxiosErrorHandler: React.FC<AxiosErrorHandlerProps> = ({ apiError, children }) => {
  if (apiError) {
    return (
      <>
        <Typography variant="h5" color="error" my={1}>
          Error Making Request
        </Typography>
        <Status apiError={apiError} />
        <FlexRow my={2} justifyContent="start">
          <ReAuth apiError={apiError} />
        </FlexRow>
      </>
    )
  } else {
    return <>{children}</>
  }
}

export { AxiosErrorHandler }
