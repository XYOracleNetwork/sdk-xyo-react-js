import { ThemeOptions } from '@mui/material'

import { themeOptions } from './themeOptions.ts'

const partialWebThemeOptions: ThemeOptions = {}

export const webThemeOptions = { ...themeOptions, ...partialWebThemeOptions }
