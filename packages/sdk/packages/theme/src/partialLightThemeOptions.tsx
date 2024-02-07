import { ThemeOptions } from '@mui/material'
import { merge } from '@xylabs/lodash'

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

export const partialAppLightThemeOptions: ThemeOptions = merge({}, partialLightThemeOptions)
