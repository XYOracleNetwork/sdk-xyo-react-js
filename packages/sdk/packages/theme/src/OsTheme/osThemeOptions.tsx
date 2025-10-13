import type { ThemeOptions } from '@mui/material'

import { osThemeOptionsDarkMode } from './DarkMode.tsx'
import { osThemeOptionsLightMode } from './LightMode.tsx'

export const osThemeOptions: ThemeOptions = { ...osThemeOptionsDarkMode, ...osThemeOptionsLightMode }
