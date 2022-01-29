import { ButtonGroup, Container, createTheme, ThemeProvider, Typography, useTheme } from '@mui/material'

import { IAuthService, useAuthState } from '../../../contexts'
import { AuthService } from './AuthService'

const NoneSelected: React.FC = () => {
  const { state: authState } = useAuthState()
  const { isLoggedIn, authServiceList } = authState
  const baseTheme = useTheme()
  const authServiceThemeOptions = {
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            paddingBottom: baseTheme.spacing(2),
            paddingLeft: baseTheme.spacing(1),
            paddingRight: baseTheme.spacing(1),
            paddingTop: baseTheme.spacing(2),
          },
        },
      },
    },
  }
  const authServiceTheme = createTheme(authServiceThemeOptions)

  return (
    <ThemeProvider theme={authServiceTheme}>
      <Typography marginY={4} variant="h3">
        Select Login Provider
      </Typography>
      <Container maxWidth="xs" disableGutters={true}>
        <ButtonGroup orientation="vertical" aria-label="vertical outlined button group" fullWidth={true}>
          {!isLoggedIn &&
            authServiceList &&
            authServiceList.map((service: IAuthService) => {
              return <AuthService key={service.id} service={service} />
            })}
        </ButtonGroup>
      </Container>
    </ThemeProvider>
  )
}

export { NoneSelected }
