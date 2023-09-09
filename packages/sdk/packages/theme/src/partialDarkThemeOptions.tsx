import { darken, ThemeOptions } from '@mui/material'
import { merge } from '@xylabs/lodash'

const appComponents: ThemeOptions['components'] = {
  MuiPaper: {
    defaultProps: {
      variant: 'elevation',
    },
  },
}

export const partialDarkThemeOptions: ThemeOptions = {
  palette: {
    background: {
      default: darken('#171626', 0.1),
      paper: '#171626',
    },
    mode: 'dark',
    primary: {
      main: '#9993F5',
    },
    secondary: {
      main: '#8EC8FF',
    },
  },
}

export const partialAppDarkThemeOptions: ThemeOptions = merge({}, partialDarkThemeOptions, { components: appComponents })
