import type { ThemeOptions } from '@mui/material'
import { alpha } from '@mui/material'

export const lightThemeOptions: ThemeOptions = {
  palette: {
    background: { paper: '#FAFAFA' },
    neutral: {
      contrastText: '#fff',
      main: '#000',
    },
    info: { main: '#72b4f4' },
    primary: { main: '#463dc6' },
    secondary: { main: '#186ecc' },
    success: { main: '#48BA4B' },
    text: {
      primary: '#060312',
      secondary: alpha('#060312', 0.85),
    },
  },
}
