import type { ThemeOptions } from '@mui/material'

import { fontFamilyOs } from '../fontFamily.ts'

export const typography: ThemeOptions['typography'] = {
  body1: { lineHeight: 1.57 },
  body2: { lineHeight: 1.57 },
  button: {
    fontSize: '1rem',
    textTransform: 'inherit',
  },
  fontFamily: fontFamilyOs,
  fontWeightBold: 700,
  fontWeightLight: 300,
  fontWeightMedium: 600,
  fontWeightRegular: 500,
  h1: { fontSize: '4rem' },
  h2: { fontSize: '2.4rem' },
  h3: { fontSize: '2.24rem' },
  h4: { fontSize: '2rem' },
  h5: { fontSize: '1.5rem' },
  h6: { fontSize: '1.1rem' },
  subtitle1: { opacity: '70%' },
  subtitle2: { opacity: '70%' },
}
