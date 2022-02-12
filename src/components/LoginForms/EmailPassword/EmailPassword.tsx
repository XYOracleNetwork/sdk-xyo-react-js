import { Typography } from '@mui/material'
import { BusyBox, useAsyncEffect } from '@xylabs/sdk-react'
import { AxiosError } from 'axios'
import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { AuthActionTypes, useAuthApi, useAuthState } from '../../../contexts'
import { FormFields } from './FormFields'
import { LoginCredentials } from './LoginCredentials'

const EmailPassword: React.FC = () => {
  const navigate = useNavigate()
  const { state: authState, dispatch: authDispatch } = useAuthState()
  const credentialsState = useState<LoginCredentials>({ email: '', password: '' })
  const [credentials] = credentialsState

  const { AuthApi } = useAuthApi()

  useAsyncEffect(async () => {
    if (credentials?.email && credentials?.password && authState.isLoading) {
      try {
        const { data } = await AuthApi.login(credentials)
        authDispatch({
          payload: { jwtToken: data.token, loggedInAccount: credentials.email },
          type: AuthActionTypes.AuthSuccessful,
        })
        navigate('/')
      } catch (err) {
        console.error(err)
        authDispatch({ payload: { authError: err as AxiosError }, type: AuthActionTypes.AuthFailure })
      }
    }
  }, [authDispatch, authState.isLoading, credentials, navigate])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    authDispatch({ payload: { isLoading: true }, type: AuthActionTypes.UpdateLoadingState })
  }

  return (
    <>
      <Typography variant="h3">Login with Email</Typography>
      <form onSubmit={handleSubmit}>
        <BusyBox>
          <FormFields authState={authState} credentialsState={credentialsState} />
        </BusyBox>
      </form>
    </>
  )
}

export { EmailPassword }
