import { ThemeOptions } from '@mui/material'

export const partialLightThemeOptions: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#1f1a66',
    },
    secondary: {
      main: '#0f68c9',
    },
  },
}

export const partialAppLightThemeOptions: ThemeOptions = { ...partialLightThemeOptions }
