import { FormControl, TextField, Typography, useTheme } from '@mui/material'
import { BusyBox, ButtonEx, useAsyncEffect } from '@xylabs/sdk-react'
import { AxiosError } from 'axios'
import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { AuthActionTypes, useAuthState } from '../../../contexts'
import { AuthApiService } from '../../../lib'

interface LoginCredentials {
  email: string
  password: string
}

const EmailPassword: React.FC = () => {
  const theme = useTheme()
  const TextFieldStyles = {
    marginBottom: theme.spacing(2),
  }
  const navigate = useNavigate()
  const { state: authState, dispatch: authDispatch } = useAuthState()
  const [credentials, setCredentials] = useState<LoginCredentials>({ email: '', password: '' })

  useAsyncEffect(async () => {
    if (credentials?.email && credentials?.password && authState.isLoading) {
      try {
        await AuthApiService.login(credentials)
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

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target

    setCredentials({
      ...credentials,
      ...{
        [name]: value,
      },
    })
  }

  return (
    <>
      <Typography marginY={4} variant="h3">
        Login with Email
      </Typography>
      <form onSubmit={handleSubmit}>
        <BusyBox marginY={2}>
          <FormControl fullWidth={true}>
            <TextField
              required
              type="email"
              disabled={authState.isLoading}
              sx={TextFieldStyles}
              variant="outlined"
              autoFocus={true}
              name="email"
              placeholder="Email*"
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl fullWidth={true}>
            <TextField
              required
              disabled={authState.isLoading}
              sx={TextFieldStyles}
              variant="outlined"
              name="password"
              type="password"
              placeholder="Password*"
              onChange={handleInputChange}
            />
          </FormControl>
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
