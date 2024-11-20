import { alpha } from '@mui/material/styles'

declare module '@mui/material/styles' {
  interface Palette {
    neutral: Palette['primary']
  }

  interface PaletteOptions {
    neutral?: PaletteOptions['primary']
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    neutral: true
  }
}

declare module '@mui/material/Alert' {
  interface AlertPropsColorOverrides {
    neutral: true
  }
}

export const neutralButtonStylesContained = {
  'color': '#000',
  'backgroundColor': '#fff',
  '&:hover': { backgroundColor: alpha('#fff', 0.8) },
}

export const neutralButtonStylesOutlined = {
  'color': '#fff',
  '&:hover': { backgroundColor: alpha('#fff', 0.9) },
}

export const neutralAlertStyles = {
  'color': '#fff',
  'backgroundColor': alpha('#000', 0.02),
  'WebkitBackdropFilter': 'blur(20px)',
  'backdropFilter': 'saturate(180%) blur(20px)',
  '&:hover': { backgroundColor: alpha('#fff', 0.05) },
}
