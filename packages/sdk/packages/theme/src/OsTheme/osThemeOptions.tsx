import { merge } from '@xylabs/lodash'

import { osThemeOptionsDarkMode } from './DarkMode.js'
import { osThemeOptionsLightMode } from './LightMode.js'

export const osThemeOptions = merge({}, osThemeOptionsDarkMode, osThemeOptionsLightMode)
