import { Typography } from '@mui/material'
import { FlexBoxProps, FlexCol } from '@xylabs/react-flexbox'
import { useAsyncEffect } from '@xylabs/react-shared'
import { useApi } from '@xyo-network/react-api'
import { AuthActionType } from '@xyo-network/react-auth'
import { FormEvent, memo, useEffect, useState } from 'react'

import { LoginForm } from '../LoginForm'
import { useHandleReturnUrl } from '../useHandleReturnUrl'
import { FormFields } from './FormFields'
import { LoginCredentials } from './LoginCredentials'

export interface EmailPasswordComponentProps extends LoginForm, FlexBoxProps {}

const EmailPasswordComponent: React.FC<EmailPasswordComponentProps> = ({ dispatch, loggedInAccount, onSuccess, ...props }) => {
  const { handleReturnUrl } = useHandleReturnUrl()
  const credentialsState = useState<LoginCredentials>({ email: '', password: '' })
  const [credentials] = credentialsState
  const [isLoading, setIsLoading] = useState(false)
  const [token, setToken] = useState('')

  const { api } = useApi()

  useEffect(() => {
    if (!isLoading && token && !loggedInAccount) {
      dispatch({
        payload: { issuer: api?.config.apiDomain, jwtToken: token, loggedInAccount: credentials.email },
        type: AuthActionType.AuthSuccessful,
      })
      onSuccess?.()
      handleReturnUrl()
    }
  }, [isLoading, token, dispatch, credentials.email, handleReturnUrl, onSuccess, api?.config.apiDomain, loggedInAccount])

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
  }, [isLoading, credentials, api])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
  }

  return (
    <FlexCol rowGap={2} {...props}>
      <Typography variant="h3">Authenticate with Email</Typography>
      <form onSubmit={handleSubmit}>
        <FlexCol rowGap={2}>
          <FormFields isLoading={isLoading} credentialsState={credentialsState} />
        </FlexCol>
      </form>
    </FlexCol>
  )
}

const EmailPassword = memo(EmailPasswordComponent)

export { EmailPassword }
