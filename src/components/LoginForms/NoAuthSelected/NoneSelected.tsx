import { ButtonGroup, Typography } from '@mui/material'

import { IAuthService, useAuthState } from '../../../contexts'
import { LoginForm } from '../LoginForm'
import { AuthService } from './AuthService'

const NoneSelected: React.FC<LoginForm> = () => {
  const { state: authState } = useAuthState()
  const { isLoggedIn, authServiceList } = authState

  return (
    <>
      <Typography variant="h3">Select Login Provider</Typography>
      <ButtonGroup orientation="vertical" aria-label="vertical outlined button group" fullWidth={true}>
        {!isLoggedIn &&
          authServiceList &&
          authServiceList.map((service: IAuthService) => {
            return <AuthService key={service.id} service={service} />
          })}
      </ButtonGroup>
    </>
  )
}

export { NoneSelected }
