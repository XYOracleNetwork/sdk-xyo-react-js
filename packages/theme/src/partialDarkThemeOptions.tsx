import { darken, ThemeOptions } from '@mui/material'

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
