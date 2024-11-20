import { createTheme, type Theme } from '@mui/material'

import { darkThemeOptions } from './darkThemeOptions'
import { lightThemeOptions } from './lightThemeOptions'

export const XyLabsTheme: Theme = createTheme({
  colorSchemes: {
    light: lightThemeOptions,
    dark: darkThemeOptions,
  },
  components: {
    MuiAlert: {
      styleOverrides: {
        root: {
          paddingBottom: 0.5,
          paddingTop: 0.5,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        outlined: { backgroundColor: 'inherit' },
        root: { overflow: 'hidden' },
      },
    },
    MuiLink: {
      defaultProps: { underline: 'none' },
      styleOverrides: { root: { '&:hover': { filter: 'brightness(75%)' } } },
    },
    MuiStepper: { styleOverrides: { root: { padding: '0px' } } },
  },
  shape: { borderRadius: 4 },
  spacing: 12,
  typography: {
    body1: {
      fontSize: '1.1rem',
      fontWeight: 300,
    },
    button: {
      fontSize: '1rem',
      fontWeight: 500,
      textTransform: 'capitalize',
    },

    fontWeightBold: 700,
    fontWeightLight: 300,
    fontWeightMedium: 400,
    fontWeightRegular: 400,
    h1: { fontSize: '4rem' },
    h2: { fontSize: '2.7rem' },
    h3: { fontSize: '2.24rem' },
    h4: { fontSize: '2rem' },
    h5: { fontSize: '1.5rem' },
    h6: {
      fontSize: '1.25rem',
      fontWeight: 300,
    },
    subtitle1: {
      opacity: '50%',
      textTransform: 'uppercase',
    },
    subtitle2: { opacity: '50%' },
  },
})
