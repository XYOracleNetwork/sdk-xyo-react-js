import { createTheme, ThemeOptions, ThemeProvider, useTheme } from '@mui/material'
import { ErrorDialog } from '@xylabs/sdk-react'

import { AuthActionTypes, AuthServiceId, useAuthState } from '../../contexts'
import { AuthFooter } from './AuthFooter'
import { MapActiveAuthService } from './MapActiveService'

const backPayload = {
  payload: { activeAuthServiceId: AuthServiceId.None },
  type: AuthActionTypes.UpdateActiveAuthService,
}

const AuthServiceWrapper: React.FC = () => {
  const { state: authState, dispatch: authDispatch } = useAuthState()

  const baseTheme = useTheme()
  const authThemeOptions: ThemeOptions = {
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            paddingBottom: baseTheme.spacing(2),
            paddingLeft: baseTheme.spacing(1),
            paddingRight: baseTheme.spacing(1),
            paddingTop: baseTheme.spacing(2),
            width: '100%',
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            marginBottom: baseTheme.spacing(2),
          },
        },
      },
      MuiTypography: {
        styleOverrides: {
          h3: {
            marginBottom: baseTheme.spacing(4),
            marginTop: baseTheme.spacing(4),
          },
        },
      },
    },
  }
  const authTheme = createTheme({ ...baseTheme, ...authThemeOptions })
  console.log(authTheme)

  const handleLogout = () => {
    authDispatch({ payload: {}, type: AuthActionTypes.Logout })
    authDispatch(backPayload)
  }

  const handleBack = () => authDispatch(backPayload)

  return (
    <ThemeProvider theme={authTheme}>
      <MapActiveAuthService authState={authState} handleBack={handleBack} isLoading={authState.isLoading} />
      <AuthFooter handleLogout={handleLogout} isLoggedIn={authState.isLoggedIn} />
      {authState.authError && (
        <ErrorDialog
          title="Error Logging In"
          error={authState.authError}
          open={!!authState.authError}
          onAction={() => authDispatch({ payload: { authError: undefined }, type: AuthActionTypes.UpdateAuthError })}
        />
      )}
    </ThemeProvider>
  )
}

export { AuthServiceWrapper }
