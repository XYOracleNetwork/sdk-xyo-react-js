import { createTheme, ThemeOptions, ThemeProvider } from '@mui/material'
import { WithChildren } from '@xylabs/sdk-react'

export interface AuthThemeExtenderProps {
  themeOptions?: ThemeOptions
}

const AuthThemeExtender: React.FC<WithChildren<AuthThemeExtenderProps>> = ({ children, themeOptions }) => {
  const authThemeOptions: ThemeOptions = {
    components: {
      MuiButton: {
        styleOverrides: {
          root: ({ theme }) => ({
            paddingBottom: theme.spacing(2),
            paddingLeft: theme.spacing(1),
            paddingRight: theme.spacing(1),
            paddingTop: theme.spacing(2),
            width: '100%',
          }),
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: ({ theme }) => ({
            marginBottom: theme.spacing(2),
          }),
        },
      },
      MuiTypography: {
        styleOverrides: {
          h3: ({ theme }) => ({
            marginBottom: theme.spacing(2),
            marginTop: theme.spacing(2),
          }),
        },
      },
    },
  }
  const authTheme = createTheme({ ...themeOptions, ...authThemeOptions })

  return <ThemeProvider theme={authTheme}>{children}</ThemeProvider>
}

export { AuthThemeExtender }
