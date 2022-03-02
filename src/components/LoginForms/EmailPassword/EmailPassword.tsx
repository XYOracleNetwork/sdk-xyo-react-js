import { Typography } from '@mui/material'
import { BusyBox, useAsyncEffect } from '@xylabs/sdk-react'
import { FormEvent, memo, useEffect, useState } from 'react'

import { AuthActionTypes, useArchivistApi } from '../../../contexts'
import { Property } from '../../Properties'
import { LoginForm } from '../LoginForm'
import { useHandleReturnUrl } from '../useHandleReturnUrl'
import { FormFields } from './FormFields'
import { LoginCredentials } from './LoginCredentials'

const EmailPasswordComponent: React.FC<LoginForm> = ({ dispatch, loggedInAccount }) => {
  const { handleReturnUrl } = useHandleReturnUrl()
  const credentialsState = useState<LoginCredentials>({ email: '', password: '' })
  const [credentials] = credentialsState
  const [isLoading, setIsLoading] = useState(false)
  const [token, setToken] = useState('')

  const { authApi } = useArchivistApi()

  useEffect(() => {
    if (!isLoading && token) {
      dispatch({
        payload: { jwtToken: token, loggedInAccount: credentials.email },
        type: AuthActionTypes.AuthSuccessful,
      })
      handleReturnUrl()
    }
  }, [isLoading, token, dispatch, credentials.email, handleReturnUrl])

  useAsyncEffect(async () => {
    if (isLoading && authApi) {
      try {
        const { data } = await authApi.login(credentials)
        setToken(data.token)
        setIsLoading(false)
      } catch (err) {
        console.error(err)
        setIsLoading(false)
      }
    }
  }, [dispatch, isLoading, credentials, authApi])

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
