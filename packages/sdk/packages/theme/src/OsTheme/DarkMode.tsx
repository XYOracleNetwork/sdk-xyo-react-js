import { ThemeOptions } from '@mui/material'

import { components } from './Components'
import { typography } from './Typography'

const palette: ThemeOptions['palette'] = {
  background: {
    default: '#141319',
    paper: '#1C1B20',
  },
  error: {
    main: '#ffb4ab',
  },
  mode: 'dark',
  primary: {
    main: '#C9BFFA',
  },
  secondary: {
    main: '#C9C3DA',
  },
  text: {
    primary: '#100029',
    secondary: '#212023',
  },
}

export const osThemeOptionsDarkMode: ThemeOptions = {
  components,
  palette,
  shape: {
    borderRadius: 10,
  },
  spacing: 16,
  typography,
}
