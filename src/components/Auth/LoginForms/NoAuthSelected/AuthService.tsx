import { SxProps, useTheme } from '@mui/material'
import { ButtonEx } from '@xylabs/sdk-react'

import { AuthActionTypes, IAuthService, useAuthState } from '../../../../contexts'

interface AuthServiceProps {
  service: IAuthService
}

const AuthService: React.FC<AuthServiceProps> = ({ service }) => {
  const { id, title } = service
  const theme = useTheme()
  const { dispatch } = useAuthState()
  const payload = { payload: { activeAuthServiceId: id }, type: AuthActionTypes.UpdateActiveAuthService }

  const AuthServiceStyles: SxProps = {
    paddingX: theme.spacing(1),
    paddingY: theme.spacing(2),
  }
  return (
    <ButtonEx
      onClick={() => dispatch(payload)}
      width={'100%'}
      key={id}
      variant="outlined"
      sx={{ ...AuthServiceStyles }}
    >
      {title}
    </ButtonEx>
  )
}

export { AuthService }
