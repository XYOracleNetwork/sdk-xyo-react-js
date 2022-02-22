import { useTheme } from '@mui/material'
import { useEffect, useState } from 'react'

import { AuthThemeExtender } from '../AuthThemeExtender'
import { AuthErrorDialog } from './AuthErrorDialog'

export interface AuthErrorsWrapperProps {
  apiDomain: string
}

const AuthErrorsWrapper: React.FC<AuthErrorsWrapperProps> = ({ apiDomain }) => {
  const theme = useTheme()
  const reAuthState = useState(false)
  const [reAuth, setReAuth] = reAuthState

  useEffect(() => {
    if (reAuth) {
      localStorage.setItem('returnUrl', window.location.pathname)
      window.location.pathname = '/login'
    }
  }, [reAuth])

  return (
    <AuthThemeExtender themeOptions={theme}>
      <AuthErrorDialog apiDomain={apiDomain} setReAuth={setReAuth} />
    </AuthThemeExtender>
  )
}

export { AuthErrorsWrapper }
