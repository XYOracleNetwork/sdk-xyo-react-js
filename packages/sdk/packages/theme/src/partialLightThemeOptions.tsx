import type { ThemeOptions } from '@mui/material'

export const partialLightThemeOptions: ThemeOptions = {
  palette: {
    primary: { main: '#1f1a66' },
    secondary: { main: '#0f68c9' },
  },
}

export const partialAppLightThemeOptions: ThemeOptions = { ...partialLightThemeOptions }
