import { merge } from '@xylabs/lodash'

import { osThemeOptionsDarkMode } from './DarkMode'
import { osThemeOptionsLightMode } from './LightMode'

export const osThemeOptions = merge({}, osThemeOptionsDarkMode, osThemeOptionsLightMode)
