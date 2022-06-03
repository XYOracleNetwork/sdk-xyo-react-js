import { darken, ThemeOptions } from '@mui/material'

const components: ThemeOptions['components'] = {
  MuiPaper: {
    defaultProps: {
      variant: 'elevation',
    },
  },
}

export const partialDarkThemeOptions: ThemeOptions = {
  components,
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
