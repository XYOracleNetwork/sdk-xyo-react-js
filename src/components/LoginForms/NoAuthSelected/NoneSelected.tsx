import { ButtonGroup, Typography } from '@mui/material'

import { IAuthService } from '../../../contexts'
import { LoginForm } from '../LoginForm'
import { AuthService } from './AuthService'

const NoneSelected: React.FC<LoginForm> = ({ loggedInAccount, authServiceList }) => {
  return (
    <>
      {loggedInAccount ? (
        <Typography variant="subtitle2" paddingY={2}>
          Logged In Account: {loggedInAccount}
        </Typography>
      ) : (
        <>
          <Typography variant="h3">Select Login Provider</Typography>
          <ButtonGroup orientation="vertical" aria-label="vertical outlined button group" fullWidth={true}>
            {authServiceList &&
              authServiceList.map((service: IAuthService) => {
                return <AuthService key={service.id} service={service} />
              })}
          </ButtonGroup>
        </>
      )}
    </>
  )
}

export { NoneSelected }
