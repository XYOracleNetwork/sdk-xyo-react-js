import { ThemeOptions } from '@mui/material'
import merge from 'lodash/merge'

const appComponents: ThemeOptions['components'] = {
  MuiPaper: {
    defaultProps: {
      variant: 'outlined',
    },
    variants: [
      {
        props: { variant: 'lightModeBg' },
        style: {
          backgroundColor: '#F6F5FA',
        },
      },
    ],
  },
}

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

export const partialAppLightThemeOptions: ThemeOptions = merge({}, partialLightThemeOptions, { components: appComponents })
