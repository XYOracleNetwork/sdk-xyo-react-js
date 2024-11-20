import {
  alpha, lighten, type ThemeOptions,
} from '@mui/material'

import { neutralButtonStylesContained, neutralButtonStylesOutlined } from './customThemeColors.ts'
export const darkThemeOptions: ThemeOptions = {
  palette: {
    background: {
      default: '#020223',
      paper: '#16163D',
    },
    neutral: {
      main: '#fff',
      contrastText: '#000',
    },
    info: { main: '#72b4f4' },
    mode: 'dark',
    primary: { main: '#5658F3' },
    secondary: {
      main: '#66caf7',
      contrastText: '#020223',
    },
    success: {
      main: '#7efc81',
      contrastText: '#011e01',
    },
    warning: { main: '#f7d866' },
    error: { main: '#f6594e' },
    text: {
      disabled: '#a5acdb',
      primary: '#E3E4EB',
      secondary: '#e3e4eba3',
    },
  },
  typography: {
    body1: { color: '#ffffffa3' },
    body2: { color: '#B3B3BD' },
    caption: { color: '#B3B3BD' },
  },
  components: {
    MuiButton: {
      defaultProps: { color: 'neutral' },
      variants: [
        {
          props: { variant: 'contained', color: 'neutral' },
          style: neutralButtonStylesContained,
        },
        {
          props: { variant: 'outlined', color: 'neutral' },
          style: neutralButtonStylesOutlined,
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
      ],
    },
    MuiChip: {
      styleOverrides: {
        colorError: { backgroundColor: alpha('#f6594e', 0.2), color: lighten('#f6594e', 0.2) },
        colorInfo: { backgroundColor: alpha('#72b4f4', 0.2), color: lighten('#72b4f4', 0.2) },
        colorPrimary: { backgroundColor: alpha('#5658F3', 0.2), color: lighten('#5658F3', 0.2) },
        colorSecondary: { backgroundColor: alpha('#66caf7', 0.2), color: lighten('#66caf7', 0.2) },
        colorSuccess: { backgroundColor: alpha('#7efc81', 0.2), color: lighten('#7efc81', 0.2) },
        colorWarning: { backgroundColor: alpha('#f7d866', 0.2), color: lighten('#f7d866', 0.2) },
      },
    },
    MuiDialog: {
      styleOverrides: {
        root: {
          '& .MuiDialog-paper': {
            backgroundColor: '#16163D',
            backgroundImage: 'none',
            paddingLeft: 2,
            paddingRight: 2,
            border: `1px solid ${lighten('#16163D', 0.05)}`,
          },
        },
      },
    },
    MuiTable: { styleOverrides: { root: { background: '#20205A' } } },
  },
}
