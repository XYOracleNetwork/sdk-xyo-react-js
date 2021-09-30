import { ThemeOptions } from '@material-ui/core'

interface InvertableThemeProviderProps {
  dark?: boolean
  scoped?: boolean
  invert?: boolean
  noResponsiveFonts?: boolean
  options?: ThemeOptions
}

export default InvertableThemeProviderProps
