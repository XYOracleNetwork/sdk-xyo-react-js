import { Typography } from '@mui/material'
import { BusyBox, useAsyncEffect } from '@xylabs/sdk-react'
import { FormEvent, memo, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { AuthActionTypes, useAuthApi } from '../../../contexts'
import { Property } from '../../Properties'
import { HandleReturnUrl } from '../HandleReturnUrl'
import { LoginForm } from '../LoginForm'
import { FormFields } from './FormFields'
import { LoginCredentials } from './LoginCredentials'

const EmailPasswordComponent: React.FC<LoginForm> = ({ dispatch, loggedInAccount }) => {
  const navigate = useNavigate()
  const credentialsState = useState<LoginCredentials>({ email: '', password: '' })
  const [credentials] = credentialsState
  const [isLoading, setIsLoading] = useState(false)
  const [token, setToken] = useState('')

  const { AuthApi } = useAuthApi()

  useEffect(() => {
    if (!isLoading && token) {
      dispatch({
        payload: { jwtToken: token, loggedInAccount: credentials.email },
        type: AuthActionTypes.AuthSuccessful,
      })
      HandleReturnUrl(navigate)
    }
  }, [isLoading, token, dispatch, credentials.email, navigate])

  useAsyncEffect(async () => {
    if (isLoading) {
      try {
        const { data } = await AuthApi.login(credentials)
        setToken(data.token)
        setIsLoading(false)
      } catch (err) {
        console.error(err)
        setIsLoading(false)
      }
    }
  }, [dispatch, isLoading, credentials, AuthApi])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
  }

  return (
    <>
      {loggedInAccount ? (
        <Property title="Logged in Account" value={loggedInAccount}></Property>
      ) : (
        <>
          <Typography variant="h3">Login with Email</Typography>
          <form onSubmit={handleSubmit}>
            <BusyBox>
              <FormFields isLoading={isLoading} credentialsState={credentialsState} />
            </BusyBox>
          </form>
        </>
      )}
    </>
  )
}

const EmailPassword = memo(EmailPasswordComponent)

export { EmailPassword }
