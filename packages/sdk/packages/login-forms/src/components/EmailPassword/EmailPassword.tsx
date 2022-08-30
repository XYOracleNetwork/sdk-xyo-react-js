import { Typography } from '@mui/material'
import { BusyBox } from '@xylabs/react-flexbox'
import { useAsyncEffect } from '@xylabs/react-shared'
import { useArchivistApi } from '@xyo-network/react-archivist-api'
import { AuthActionType } from '@xyo-network/react-auth'
import { Property } from '@xyo-network/react-property'
import { FormEvent, memo, useEffect, useState } from 'react'

import { LoginForm } from '../LoginForm'
import { useHandleReturnUrl } from '../useHandleReturnUrl'
import { FormFields } from './FormFields'
import { LoginCredentials } from './LoginCredentials'

const EmailPasswordComponent: React.FC<LoginForm> = ({ dispatch, loggedInAccount, onSuccess }) => {
  const { handleReturnUrl } = useHandleReturnUrl()
  const credentialsState = useState<LoginCredentials>({ email: '', password: '' })
  const [credentials] = credentialsState
  const [isLoading, setIsLoading] = useState(false)
  const [token, setToken] = useState('')

  const { api } = useArchivistApi()

  useEffect(() => {
    if (!isLoading && token) {
      dispatch({
        payload: { jwtToken: token, loggedInAccount: credentials.email },
        type: AuthActionType.AuthSuccessful,
      })
      onSuccess?.()
      handleReturnUrl()
    }
  }, [isLoading, token, dispatch, credentials.email, handleReturnUrl, onSuccess])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useAsyncEffect(async () => {
    if (isLoading && api) {
      try {
        const test = await api.user.login.post(credentials)
        setToken(test?.token ?? '')
        setIsLoading(false)
      } catch (err) {
        console.error(err)
        setIsLoading(false)
      }
    }
  }, [dispatch, isLoading, credentials, api])

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
