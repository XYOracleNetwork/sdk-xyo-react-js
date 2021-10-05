import { ThemeOptions } from '@mui/material'

interface InvertableThemeProviderProps {
  dark?: boolean
  scoped?: boolean
  invert?: boolean
  noResponsiveFonts?: boolean
  options?: ThemeOptions
}

export default InvertableThemeProviderProps
