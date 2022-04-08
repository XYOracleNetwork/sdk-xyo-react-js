import { ThemeOptions } from '@mui/material'
import merge from 'lodash/merge'

import { fontFamilyPrimary } from './fontFamily'
import { themeOptions } from './themeOptions'

const lowerFontWeight = 700

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
    h4: {
      fontWeight: lowerFontWeight,
    },
    h5: {
      fontWeight: lowerFontWeight,
    },
    h6: {
      fontWeight: lowerFontWeight,
    },
  },
}

export const webThemeOptions = merge({}, themeOptions, partialWebThemeOptions)
