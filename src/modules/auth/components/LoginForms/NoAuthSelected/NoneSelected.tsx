import { ButtonGroup, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

import { AuthService } from '../../../contexts'
import { LoginForm } from '../LoginForm'
import { AuthServiceButton } from './AuthService'

export const NoneSelected: React.FC<LoginForm> = ({ loggedInAccount, authServiceList }) => {
  const location = useLocation()
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
          <ButtonGroup
            onClick={() => setAuthWarning(undefined)}
            orientation="vertical"
            aria-label="vertical outlined button group"
            fullWidth={true}
          >
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
