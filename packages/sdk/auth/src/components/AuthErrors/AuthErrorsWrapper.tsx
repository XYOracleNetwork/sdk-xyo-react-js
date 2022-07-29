import { useTheme } from '@mui/material'
import { WithChildren } from '@xylabs/react-shared'
import { useEffect, useState } from 'react'

import { AuthThemeExtender } from '../AuthThemeExtender'
/* eslint-disable deprecation/deprecation */
/* eslint-disable import/no-deprecated */
import { AuthErrorSnackbar } from './AuthErrorSnackBar'

export interface AuthErrorsWrapperProps {
  apiDomain: string
}

/** @deprecated use XyoApiErrorRender to handle api errors from the sdk  */
export const AuthErrorsWrapper: React.FC<WithChildren<AuthErrorsWrapperProps>> = ({ children }) => {
  const theme = useTheme()
  const [reAuth, setReAuth] = useState(false)

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
      <AuthErrorSnackbar setReAuth={setReAuth} />
    </AuthThemeExtender>
  )
}
