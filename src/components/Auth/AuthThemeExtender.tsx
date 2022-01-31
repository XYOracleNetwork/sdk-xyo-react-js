import { createTheme, ThemeOptions, ThemeProvider, useTheme } from '@mui/material'

interface AuthThemeExtenderProps {
  themeOptions?: ThemeOptions
}

const AuthThemeExtender: React.FC<AuthThemeExtenderProps> = ({ children, themeOptions }) => {
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
  const authTheme = createTheme({ ...baseTheme, ...authThemeOptions, ...themeOptions })

  return <ThemeProvider theme={authTheme}>{children}</ThemeProvider>
}

export { AuthThemeExtender }
