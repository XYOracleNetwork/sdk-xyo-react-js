import { Typography, useTheme } from '@mui/material'
import { BusyBox, ButtonEx, useAsyncEffect } from '@xylabs/sdk-react'
import { AxiosError } from 'axios'
import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { AuthActionTypes, useAuthApi, useAuthState } from '../../../contexts'
import { FormFields } from './FormFields'
import { LoginCredentials } from './LoginCredentials'

const EmailPassword: React.FC = () => {
  const theme = useTheme()
  const navigate = useNavigate()
  const { state: authState, dispatch: authDispatch } = useAuthState()
  const credentialsState = useState<LoginCredentials>({ email: '', password: '' })
  const [credentials] = credentialsState

  const { AuthApi } = useAuthApi()

  useAsyncEffect(async () => {
    if (credentials?.email && credentials?.password && authState.isLoading) {
      try {
        await AuthApi.login(credentials)
        authDispatch({ payload: { isLoading: false }, type: AuthActionTypes.UpdateLoadingState })
        navigate('/')
      } catch (err) {
        authDispatch({ payload: { isLoading: false }, type: AuthActionTypes.UpdateLoadingState })
        authDispatch({ payload: { authError: err as AxiosError }, type: AuthActionTypes.UpdateAuthError })
      }
    }
  }, [authDispatch, authState.isLoading, credentials, navigate])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    authDispatch({ payload: { isLoading: true }, type: AuthActionTypes.UpdateLoadingState })
  }

  return (
    <>
      <Typography marginY={4} variant="h3">
        Login with Email
      </Typography>
      <form onSubmit={handleSubmit}>
        <BusyBox marginY={2}>
          <FormFields authState={authState} credentialsState={credentialsState} />
          <ButtonEx
            disabled={authState.isLoading}
            width="100%"
            marginTop={theme.spacing(2)}
            variant="contained"
            type="submit"
          >
            Login
          </ButtonEx>
        </BusyBox>
      </form>
    </>
  )
}

export { EmailPassword }
