import { ThemeOptions } from '@mui/material'
import { useEffect, useState } from 'react'

import { appThemeOptions } from '../../../theme'
import { AuthThemeExtender } from '../AuthThemeExtender'
import { AuthErrorDialog } from './AuthErrorDialog'

export interface AuthErrorsWrapperProps {
  apiDomain: string
  themeOptions: ThemeOptions
  dark: boolean
}

const AuthErrorsWrapper: React.FC<AuthErrorsWrapperProps> = ({ apiDomain, children, themeOptions, dark }) => {
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
    <AuthThemeExtender dark={dark} themeOptions={themeOptions || appThemeOptions}>
      {children}
      <AuthErrorDialog apiDomain={apiDomain} setReAuth={setReAuth} />
    </AuthThemeExtender>
  )
}

export { AuthErrorsWrapper }
