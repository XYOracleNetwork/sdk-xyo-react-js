import { ButtonGroup, Typography } from '@mui/material'
import { AuthService, useAuthService } from '@xyo-network/react-auth'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

import { LoginForm } from '../LoginForm'
import { AuthServiceButton } from './AuthServiceButton'

export const NoneSelected: React.FC<LoginForm> = ({ loggedInAccount }) => {
  const location = useLocation()
  const { authServiceList } = useAuthService()
  const [authWarning, setAuthWarning] = useState<string | undefined>()

  useEffect(() => {
    const message = (location.state as { message?: string })?.message
    if (message) {
      setAuthWarning(message)
    }
  }, [location])
  return (
    <>
      {loggedInAccount ? (
        <Typography variant="subtitle2" paddingY={2}>
          Logged In Account: {loggedInAccount}
        </Typography>
      ) : (
        <>
          <Typography variant="h3">Select Login Provider</Typography>
          {authWarning && (
            <Typography marginBottom={2} color="error" variant="body1">
              {authWarning}
            </Typography>
          )}
          <ButtonGroup onClick={() => setAuthWarning(undefined)} orientation="vertical" aria-label="vertical outlined button group" fullWidth={true}>
            {authServiceList &&
              authServiceList.map((service: AuthService) => {
                return <AuthServiceButton key={service.id} service={service} />
              })}
          </ButtonGroup>
        </>
      )}
    </>
  )
}
