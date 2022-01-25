import { ButtonGroup, Container, Typography } from '@mui/material'
import { memo } from 'react'

import { AuthState, IAuthService } from '../../../../contexts'
import { AuthService } from './AuthService'

interface NoneSelectedProps {
  authState: AuthState
}

const NoneSelectedComponent: React.FC<NoneSelectedProps> = ({ authState }) => {
  const { isLoggedIn, authServiceList } = authState
  return (
    <>
      <Typography marginY={4} variant="h3">
        Select Login Provider
      </Typography>
      <Container maxWidth="xs" disableGutters={true}>
        <ButtonGroup orientation="vertical" aria-label="vertical outlined button group" fullWidth={true}>
          {!isLoggedIn &&
            authServiceList &&
            authServiceList.map((service: IAuthService) => {
              return <AuthService key={service.id} service={service} />
            })}
        </ButtonGroup>
      </Container>
    </>
  )
}

const NoneSelected = memo(NoneSelectedComponent)

export { NoneSelected }
