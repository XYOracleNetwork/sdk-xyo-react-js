import { useTheme } from '@mui/material'
import { useState } from 'react'

import { AuthThemeExtender } from '../AuthThemeExtender'
import { AuthErrorDialog } from './AuthErrorDialog'
import { ReAuthDialog } from './ReAuthDialog'

export interface AuthErrorsWrapperProps {
  apiDomain: string
}

const AuthErrorsWrapper: React.FC<AuthErrorsWrapperProps> = ({ apiDomain }) => {
  const theme = useTheme()
  const reAuthState = useState(false)
  const [, setReAuth] = reAuthState

  return (
    <AuthThemeExtender themeOptions={theme}>
      <AuthErrorDialog apiDomain={apiDomain} setReAuth={setReAuth} />
      <ReAuthDialog reAuthState={reAuthState} />
    </AuthThemeExtender>
  )
}

export { AuthErrorsWrapper }
