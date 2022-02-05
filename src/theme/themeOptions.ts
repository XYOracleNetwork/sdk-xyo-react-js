import { ThemeOptions } from '@mui/material'

import fontFamily, { fontFamilyHeadings } from './fontFamily'

const themeOptions: ThemeOptions = {
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 0,
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
  },
  palette: {
    mode: 'light',
    primary: {
      main: '#371589',
    },
    secondary: {
      main: '#ffb300',
    },
    text: {
      primary: '#161154',
    },
  },
  shape: {
    borderRadius: 0,
  },
  spacing: 12,
  typography: {
    button: {
      fontSize: '1rem',
      fontWeight: 500,
      textTransform: 'capitalize',
    },
    fontFamily: fontFamily.primary,
    fontWeightBold: 700,
    fontWeightLight: 300,
    fontWeightMedium: 600,
    fontWeightRegular: 400,
    h1: {
      fontFamily: fontFamilyHeadings,
      fontSize: '4rem',
    },
    h2: {
      fontFamily: fontFamilyHeadings,
      fontSize: '2.4rem',
    },
    h3: {
      fontFamily: fontFamilyHeadings,
      fontSize: '2.24rem',
    },
    h4: {
      fontSize: '2rem',
    },
    h5: {
      fontSize: '1.5rem',
    },
    h6: {
      fontFamily: fontFamily.primary,
      fontSize: '1.25rem',
      fontWeight: 500,
    },
    subtitle1: {
      opacity: '50%',
      textTransform: 'uppercase',
    },
    subtitle2: {
      opacity: '50%',
    },
  },
}

export default themeOptions
