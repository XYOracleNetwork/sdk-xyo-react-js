import type { Theme } from '@mui/material'
import {
  alpha, createTheme, lighten,
} from '@mui/material'

import { darkThemePalette } from './darkThemePalette.tsx'
import { lightThemePalette } from './lightThemePalette.tsx'

export const DataismTheme: Theme = createTheme({
  colorSchemes: {
    dark: { palette: darkThemePalette },
    light: { palette: lightThemePalette },
  },
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
        root: ({ theme }) => ({
          backgroundColor: alpha(theme.palette.background.paper, 0.3),
          color: 'inherit',
        }),
        standardError: ({ theme }) => ({ backgroundColor: alpha(theme.palette.error.main, 0.3), color: theme.palette.error.light }),
        standardInfo: ({ theme }) => ({ backgroundColor: alpha(theme.palette.info.main, 0.3), color: theme.palette.info.light }),
        standardSuccess: ({ theme }) => ({ backgroundColor: alpha(theme.palette.success.main, 0.3), color: theme.palette.success.light }),
        standardWarning: ({ theme }) => ({ backgroundColor: alpha(theme.palette.warning.main, 0.3), color: theme.palette.warning.light }),
      },
    },
    MuiButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          boxShadow: 'none',
          padding: `${theme.spacing(0.75)} ${theme.spacing(1.5)}`,
          borderWidth: '2px',
          borderColor: 'inherit',
        }),
      },
      variants: [
        {
          props: { variant: 'outlined' },
          style: {
            'WebkitBackdropFilter': 'blur(2px)',
            'backdropFilter': 'blur(2px)',
            'border': '2px solid',
            '&:hover': { border: '2px solid' },
          },
        },
        {
          props: { variant: 'text' },
          style: {
            '&:hover': {
              textDecoration: 'underline 1.5px #66caf7',
              textUnderlineOffset: '5px',
              backgroundColor: 'transparent',
            },
          },
        },
        {
          props: { size: 'small' },
          style: ({ theme }) => ({ padding: `${theme.spacing(0.5)} ${theme.spacing(1)}`, fontSize: '1rem' }),
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
    MuiCardContent: { styleOverrides: { root: ({ theme }) => ({ '&:last-child': { paddingBottom: theme.spacing(1) } }) } },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          fontWeight: 400,
        },
        colorError: { backgroundColor: alpha('#f6594e', 0.2), color: lighten('#f6594e', 0.2) },
        colorInfo: { backgroundColor: alpha('#72b4f4', 0.2), color: lighten('#72b4f4', 0.2) },
        colorPrimary: { backgroundColor: alpha('#5658F3', 0.2), color: lighten('#5658F3', 0.2) },
        colorSecondary: { backgroundColor: alpha('#66caf7', 0.2), color: lighten('#66caf7', 0.2) },
        colorSuccess: { backgroundColor: alpha('#7efc81', 0.2), color: lighten('#7efc81', 0.2) },
        colorWarning: { backgroundColor: alpha('#f7d866', 0.2), color: lighten('#f7d866', 0.2) },
      },
    },
    MuiContainer: { styleOverrides: { root: { maxWidth: 'xl' } }, defaultProps: { maxWidth: 'xl' } },
    MuiDialog: {
      styleOverrides: {
        root: {
          '& .MuiDialog-paper': {
            backgroundImage: 'none',
            paddingLeft: 2,
            paddingRight: 2,
          },
        },
      },
    },
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
    MuiLink: { styleOverrides: { root: { textDecoration: 'none' } } },
  },
  shape: { borderRadius: 8 },
  spacing: 12,
  typography: {
    body1: { fontSize: '1.1rem' },
    button: {
      fontSize: '1rem',
      textTransform: 'inherit',
    },
    fontFamily: '"Fustat", sans-serif',
    fontWeightBold: 700,
    fontWeightLight: 300,
    fontWeightMedium: 500,
    fontWeightRegular: 400,
    h1: { fontSize: '3.2rem' },
    h2: { fontSize: '2.7rem' },
    h3: { fontSize: '2.24rem' },
    h4: { fontSize: '2rem' },
    h5: { fontSize: '1.5rem' },
    h6: { fontSize: '1.25rem' },
    subtitle1: {
      opacity: '50%',
      textTransform: 'uppercase',
    },
    subtitle2: { opacity: '50%' },
  },
})
