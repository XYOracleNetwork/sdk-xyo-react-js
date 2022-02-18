import { useTheme } from '@mui/material'

import { AuthErrorDialog } from './AuthErrorDialog'
import { AuthThemeExtender } from './AuthThemeExtender'
import { ReAuthDialog } from './ReAuthDialog'

const AuthErrorsWrapper = () => {
  const theme = useTheme()
  return (
    <AuthThemeExtender themeOptions={theme}>
      <AuthErrorDialog />
      <ReAuthDialog />
    </AuthThemeExtender>
  )
}

export { AuthErrorsWrapper }
