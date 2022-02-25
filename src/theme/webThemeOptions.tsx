import { ThemeOptions } from '@mui/material'
import merge from 'lodash/merge'

import { fontFamilyPrimary } from './fontFamily'
import { themeOptions } from './themeOptions'

const partialWebThemeOptions: ThemeOptions = {
  typography: {
    fontFamily: fontFamilyPrimary,
    h1: {
      fontFamily: fontFamilyPrimary,
    },
    h2: {
      fontFamily: fontFamilyPrimary,
    },
    h3: {
      fontFamily: fontFamilyPrimary,
    },
  },
}

export const webThemeOptions = merge({}, themeOptions, partialWebThemeOptions)
