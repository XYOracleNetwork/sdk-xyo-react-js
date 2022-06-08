import { useTheme } from '@mui/material'
import { createStyles, makeStyles } from '@mui/styles'
import { CSSProperties } from 'react'

export interface GradientStyles {
  background: CSSProperties
  border: CSSProperties
  typography: CSSProperties
}

export const colorfulGradientLightMode = () => {
  return {
    background: {
      backgroundImage: '-webkit-linear-gradient(232deg, #e17751, #d84e7a, #5898dd, #8c8ee5)',
    },
    border: {
      borderImage: '-webkit-linear-gradient(232deg, #e17751, #d84e7a, #5898dd, #8c8ee5)',
      borderImageSlice: 1,
      borderImageSource: '-webkit-linear-gradient(232deg, #e17751, #d84e7a, #5898dd, #8c8ee5)',
      borderStyle: 'solid',
      borderWidth: '2px',
    },
    typography: {
      WebkitTextFillColor: 'transparent',
      background: '-webkit-linear-gradient(232deg, #e17751, #d84e7a, #5898dd, #8c8ee5)',
      backgroundClip: 'text',
      display: 'inline-block',
    },
  }
}

export const colorfulGradientDarkMode = () => {
  return {
    background: {
      backgroundImage: '-webkit-linear-gradient(232deg, #F17938, #FF5BDC, #5898dd, #B2FFFD)',
    },
    border: {
      borderImage: '-webkit-linear-gradient(232deg, #F17938, #FF5BDC, #5898dd, #B2FFFD)',
      borderImageSlice: 1,
      borderImageSource: '-webkit-linear-gradient(232deg, #F17938, #FF5BDC, #5898dd, #B2FFFD)',
      borderStyle: 'solid',
      borderWidth: '2px',
    },
    typography: {
      WebkitTextFillColor: 'transparent',
      background: '-webkit-linear-gradient(232deg, #F17938, #FF5BDC, #5898dd, #B2FFFD)',
      backgroundClip: 'text',
      display: 'inline-block',
    },
  }
}

export const useGradientStyles = () => {
  const theme = useTheme()
  const styles = theme.palette.mode === 'dark' ? colorfulGradientDarkMode() : colorfulGradientLightMode()
  const classes = makeStyles(createStyles(styles))()
  return { classes, styles }
}
