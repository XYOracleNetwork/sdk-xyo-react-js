import { createTheme, ThemeOptions, ThemeProvider, useTheme } from '@mui/material'
import { WithChildren } from '@xylabs/sdk-react'
import merge from 'lodash/merge'

export interface AuthThemeExtenderProps {
  themeOptions?: ThemeOptions
}

const AuthThemeExtender: React.FC<WithChildren<AuthThemeExtenderProps>> = ({ children, themeOptions = {} }) => {
  const theme = useTheme()
  const mergedThemeOptions = merge(themeOptions, theme)

  const authThemeOptions: ThemeOptions = {
    components: {
      MuiButton: {
        styleOverrides: {
          root: ({ theme }) => ({
            borderRadius: 0,
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
  const authTheme = createTheme({ ...mergedThemeOptions, ...themeOptions, ...authThemeOptions })

  return <ThemeProvider theme={authTheme}>{children}</ThemeProvider>
}

export { AuthThemeExtender }
