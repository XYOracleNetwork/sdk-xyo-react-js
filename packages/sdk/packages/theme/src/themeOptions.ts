import { ThemeOptions } from '@mui/material'

import { fontFamilyPrimary } from './fontFamily.ts'

export const components: ThemeOptions['components'] = {
  MuiCard: {
    styleOverrides: {
      root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      },
    },
  },
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
  MuiTableCell: {
    styleOverrides: {
      body: {
        fontFamily: 'monospace',
        whiteSpace: 'nowrap',
      },
      head: {
        fontWeight: 700,
        whiteSpace: 'nowrap',
      },
    },
  },
}

export const typography: ThemeOptions['typography'] = {
  body1: {
    lineHeight: 1.57,
  },
  body2: {
    lineHeight: 1.57,
  },
  button: {
    fontSize: '1rem',
    textTransform: 'inherit',
  },
  fontFamily: fontFamilyPrimary,
  fontWeightBold: 700,
  fontWeightLight: 200,
  fontWeightMedium: 300,
  fontWeightRegular: 400,
  h1: {
    fontFamily: fontFamilyPrimary,
    fontSize: '4rem',
  },
  h2: {
    fontFamily: fontFamilyPrimary,
    fontSize: '2.4rem',
  },
  h3: {
    fontFamily: fontFamilyPrimary,
    fontSize: '2.24rem',
  },
  h4: {
    fontSize: '2rem',
  },
  h5: {
    fontSize: '1.5rem',
  },
  h6: {
    fontSize: '1.1rem',
  },
  subtitle1: {
    opacity: '70%',
  },
  subtitle2: {
    opacity: '70%',
  },
}

export const themeOptions: ThemeOptions = {
  components,
  shape: {
    borderRadius: 8,
  },
  spacing: 16,
  typography,
}
