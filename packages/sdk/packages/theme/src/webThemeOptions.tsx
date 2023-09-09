import { ThemeOptions } from '@mui/material'
import { merge } from '@xylabs/lodash'

import { themeOptions } from './themeOptions'

const partialWebThemeOptions: ThemeOptions = {}

export const webThemeOptions = merge({}, themeOptions, partialWebThemeOptions)
