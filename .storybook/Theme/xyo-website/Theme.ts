import type { Theme } from '@mui/material'
import {
  alpha, createTheme, darken,
} from '@mui/material'

import { darkThemeOptions } from './darkThemeOptions'
import { lightThemeOptions } from './lightThemeOptions'

export const XYOWebsiteTheme = (theme: Theme, rtl = false): Theme => createTheme({
  colorSchemes: {
    dark: darkThemeOptions,
    light: lightThemeOptions,
  },
  direction: rtl ? 'rtl' : 'ltr',
  breakpoints: {
    values: {
      lg: 1350,
      md: 900,
      sm: 600,
      xl: 1536,
      xs: 0,
    },
  },
  components: {
    MuiAlert: {
      styleOverrides: {
        root: {
          backgroundColor: alpha(theme.palette.background.paper, 0.3),
          color: 'inherit',
        },
        standardError: { backgroundColor: alpha(theme.palette.error.main, 0.3), color: theme.palette.error.light },
        standardInfo: { backgroundColor: alpha(theme.palette.info.main, 0.3), color: theme.palette.info.light },
        standardSuccess: { backgroundColor: alpha(theme.palette.success.main, 0.3), color: theme.palette.success.light },
        standardWarning: { backgroundColor: alpha(theme.palette.warning.main, 0.3), color: theme.palette.warning.light },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
          borderWidth: '2px',
          borderColor: 'inherit',
        },
      },
      variants: [
        {
          props: { variant: 'outlined' },
          style: {
            'WebkitBackdropFilter': 'blur(2px)',
            'backdropFilter': 'blur(2px)',
            'border': `2px solid ${alpha('#fff', 0.4)}`,
            'color': '#fff',
            '&:hover': {
              backgroundColor: '#ffffff',
              border: `2px solid ${alpha('#fff', 0)}`,
              color: darken(theme.palette.primary.dark, 0.7),
            },
          },
        },
        {
          props: { size: 'small' },
          style: { padding: `${theme.spacing(0.5)} ${theme.spacing(1)}` },
        },
      ],
    },
    MuiCard: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        },
      },
    },
    MuiContainer: { styleOverrides: { root: { maxWidth: 'xl' } } },
    MuiInputBase: {
      styleOverrides: {
        input: {
          '&:-webkit-autofill': {
            transitionDelay: '9999s',
            transitionProperty: 'background-color, color',
          },
        },
      },
    },
    MuiFilledInput: {
      styleOverrides: {
        input: {
          '&:-webkit-autofill': {
            WebkitBoxShadow: 'inherit',
            WebkitTextFillColor: 'inherit',
            caretColor: 'inherit',
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        input: {
          '&:-webkit-autofill': {
            WebkitBoxShadow: 'inherit',
            WebkitTextFillColor: 'inherit',
            caretColor: 'inherit',
          },
        },
      },
    },
  },
  shape: { borderRadius: 8 },
  spacing: 12,
  typography: {
    fontFamily: '"Lexend Deca", sans-serif',
    body1: { fontSize: '1.1rem' },
    button: {
      fontSize: '1rem',
      fontWeight: 500,
    },
    fontWeightBold: 600,
    fontWeightLight: 200,
    fontWeightMedium: 500,
    fontWeightRegular: 300,
    h1: {
      fontSize: '3.2rem',
      fontWeight: 400,
    },
    h2: {
      fontSize: '2.7rem',
      fontWeight: 400,
    },
    h3: {
      fontSize: '2.24rem',
      fontWeight: 400,
    },
    h4: {
      fontSize: '2rem',
      fontWeight: 400,
    },
    h5: {
      fontSize: '1.5rem',
      fontWeight: 400,
    },
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
