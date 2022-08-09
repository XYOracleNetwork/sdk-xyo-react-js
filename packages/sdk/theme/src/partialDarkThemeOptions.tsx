import { Button, darken, ThemeOptions } from '@mui/material'
import merge from 'lodash/merge'
declare module '@mui/material/styles' {
  interface Palette {
    neutral: Palette['primary']
  }
  interface PaletteOptions {
    neutral?: PaletteOptions['primary']
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    neutral: true
  }
}

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
    neutral: {
      main: '#CCC',
    },
    primary: {
      main: '#9993F5',
    },
    secondary: {
      main: '#8EC8FF',
    },
  },
}

export const partialAppDarkThemeOptions: ThemeOptions = merge({}, partialDarkThemeOptions, { components: appComponents })

export const TestNeutralButton = () => {
  return <Button color="neutral">neutral</Button>
}
