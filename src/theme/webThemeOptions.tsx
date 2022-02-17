import { ThemeOptions } from '@mui/material'
import merge from 'lodash/merge'

import { themeOptions } from './themeOptions'

const partialWebThemeOptions: ThemeOptions = {}

export const webThemeOptions = merge({}, themeOptions, partialWebThemeOptions)
