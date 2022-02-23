import { ThemeOptions } from '@mui/material'
import { InvertableThemeProvider } from '@xylabs/sdk-react'
import merge from 'lodash/merge'

import { appThemeOptions } from '../../theme'

export interface AuthThemeExtenderProps {
  themeOptions?: ThemeOptions
  dark: boolean
}

const AuthThemeExtender: React.FC<AuthThemeExtenderProps> = ({ children, themeOptions, dark }) => {
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

  const mergedOptions = merge(themeOptions, appThemeOptions, authThemeOptions)

  return (
    <InvertableThemeProvider options={mergedOptions} dark={dark}>
      {children}
    </InvertableThemeProvider>
  )
}

export { AuthThemeExtender }
