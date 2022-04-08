import { useTheme } from '@mui/material'
import { WithChildren } from '@xylabs/sdk-react'
import { useEffect, useState } from 'react'

import { AuthThemeExtender } from '../AuthThemeExtender'
import { AuthErrorSnackbar } from './AuthErrorSnackBar'

export interface AuthErrorsWrapperProps {
  apiDomain: string
}

export const AuthErrorsWrapper: React.FC<WithChildren<AuthErrorsWrapperProps>> = ({ apiDomain, children }) => {
  const theme = useTheme()
  const reAuthState = useState(false)
  const [reAuth, setReAuth] = reAuthState

  useEffect(() => {
    if (reAuth) {
      // Relying on window and localStorage so router is not a dependency and
      // avoids nesting within a context to cause rerenders and multiple interceptors
      localStorage.setItem('returnUrl', window.location.pathname)
      window.location.pathname = '/login'
    }
  }, [reAuth])

  return (
    <AuthThemeExtender themeOptions={theme}>
      {children}
      <AuthErrorSnackbar apiDomain={apiDomain} setReAuth={setReAuth} />
    </AuthThemeExtender>
  )
}
