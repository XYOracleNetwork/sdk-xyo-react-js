/* eslint-disable @delagen/deprecation/deprecation */
import { ThemeOptions } from '@mui/material'

/** @deprecated Moved to @xylabs/sdk-react */
interface InvertableThemeProviderProps {
  dark?: boolean
  scoped?: boolean
  invert?: boolean
  noResponsiveFonts?: boolean
  options?: ThemeOptions
}

export default InvertableThemeProviderProps
