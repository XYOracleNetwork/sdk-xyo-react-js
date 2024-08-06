import { merge } from '@xylabs/lodash'

import { osThemeOptionsDarkMode } from './DarkMode.tsx'
import { osThemeOptionsLightMode } from './LightMode.tsx'

export const osThemeOptions = merge({}, osThemeOptionsDarkMode, osThemeOptionsLightMode)
