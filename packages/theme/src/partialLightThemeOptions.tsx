import { ThemeOptions } from '@mui/material'

const components: ThemeOptions['components'] = {
  MuiPaper: {
    defaultProps: {
      variant: 'outlined',
    },
  },
}

export const partialLightThemeOptions: ThemeOptions = {
  components,
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
