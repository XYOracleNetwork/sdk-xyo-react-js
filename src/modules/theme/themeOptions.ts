import { ThemeOptions } from '@mui/material'
import merge from 'lodash/merge'

import { fontFamilyPrimary } from './fontFamily'
import { partialLightThemeOptions } from './partialLightThemeOptions'

export const components: ThemeOptions['components'] = {
  MuiCardHeader: {
    styleOverrides: {
      content: {
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      },
    },
  },
  MuiLink: {
    defaultProps: {
      underline: 'none',
    },
    styleOverrides: {
      root: {
        '&:hover': {
          filter: 'brightness(75%)',
        },
      },
    },
  },
}

const lowerFontWeight = 700

export const typography: ThemeOptions['typography'] = {
  button: {
    fontSize: '1rem',
    fontWeight: 500,
    textTransform: 'capitalize',
  },
  fontFamily: fontFamilyPrimary,
  fontWeightBold: 700,
  fontWeightLight: 300,
  fontWeightMedium: 600,
  fontWeightRegular: 400,
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
  subtitle1: {
    opacity: '50%',
    textTransform: 'uppercase',
  },
  subtitle2: {
    opacity: '50%',
  },
}

export const baseThemeOptions: ThemeOptions = {
  components,
  shape: {
    borderRadius: 4,
  },
  spacing: 12,
  typography,
}

export const themeOptions = merge({}, baseThemeOptions, partialLightThemeOptions)
