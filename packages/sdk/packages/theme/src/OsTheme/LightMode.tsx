import { ThemeOptions } from '@mui/material'

import { components } from './Components'
import { typography } from './Typography'

const palette: ThemeOptions['palette'] = {
  background: {
    default: '#FFFFFF',
    paper: '#F6F4ED',
  },
  error: {
    main: '#BA1A1A',
  },
  mode: 'light',
  primary: {
    main: '#100029',
  },
  secondary: {
    main: '#A060E0',
  },
  text: {
    primary: '#100029',
    secondary: '#212023',
  },
}

export const osThemeOptionsLightMode: ThemeOptions = {
  components,
  palette,
  shape: {
    borderRadius: 10,
  },
  spacing: 16,
  typography,
}
