import type { ColorSystemOptions } from '@mui/material'

import { personaColorsDarkMode } from './customThemeColors.tsx'

export const darkThemePalette: ColorSystemOptions['palette'] = {
  background: { paper: '#1E1E1E' },
  info: { main: '#72b4f4' },
  mode: 'dark',
  primary: { main: '#fff' },
  secondary: {
    main: '#66caf7',
    contrastText: '#020223',
  },
  success: {
    main: '#7efc81',
    contrastText: '#011e01',
  },
  warning: { main: '#f7d866' },
  error: { main: '#f6594e' },
  text: {
    disabled: '#a5acdb',
    primary: '#E3E4EB',
    secondary: '#e3e4eba3',
  },
  personas: personaColorsDarkMode,
}
