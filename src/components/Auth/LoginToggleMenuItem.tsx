import { MenuItem } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import { AuthActionTypes, useAuthState } from '../../contexts'

export interface LoginToggleMenuItemProps {
  handleClose?: () => void
  enableLogin?: boolean
  navigateRoute?: string
}

const LoginToggleMenuItem: React.FC<LoginToggleMenuItemProps> = ({
  handleClose,
  enableLogin = true,
  navigateRoute = '/',
}) => {
  const navigate = useNavigate()
  const { state: authState, dispatch: authDispatch } = useAuthState()

  const LoginMenuItem: React.FC = () => {
    return (
      <MenuItem
        onClick={() => {
          handleClose?.()
          navigate(navigateRoute)
        }}
        disableRipple
      >
        Login
      </MenuItem>
    )
  }

  const LogoutMenuItem: React.FC = () => {
    const handleLogout = () => {
      authDispatch({ payload: {}, type: AuthActionTypes.Logout })
    }
    return (
      <MenuItem
        onClick={() => {
          handleClose?.()
          handleLogout()
          navigate(navigateRoute)
        }}
        disableRipple
      >
        Logout
      </MenuItem>
    )
  }

  const AuthMenuItem = () => {
    if (!enableLogin) {
      return <></>
    }

    if (authState.loggedInAccount) {
      return <LogoutMenuItem />
    } else {
      return <LoginMenuItem />
    }
  }

  return <AuthMenuItem />
}

export { LoginToggleMenuItem }
