import { useTheme } from '@mui/material'
import { makeStyles } from '@mui/styles'
import type { CSSProperties } from 'react'

export interface GradientStyles {
  background: CSSProperties
  border: CSSProperties
  heading: CSSProperties
}

export const colorfulGradientLightMode = () => {
  return {
    background: { backgroundImage: '-webkit-linear-gradient(232deg, #e17751, #d84e7a, #5898dd, #8c8ee5)' },
    border: {
      borderImage: '-webkit-linear-gradient(232deg, #e17751, #d84e7a, #5898dd, #8c8ee5)',
      borderImageSlice: 1,
      borderImageSource: '-webkit-linear-gradient(232deg, #e17751, #d84e7a, #5898dd, #8c8ee5)',
      borderRadius: 0,
      borderStyle: 'solid',
      borderWidth: '2px',
    },
    heading: {
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      background: '-webkit-linear-gradient(232deg, #e17751, #d84e7a, #5898dd, #8c8ee5)',
      display: 'inline-block',
    },
  }
}

export const colorfulGradientDarkMode = () => {
  return {
    background: { backgroundImage: '-webkit-linear-gradient(232deg, #F17938, #FF5BDC, #5898dd, #B2FFFD)' },
    border: {
      borderImage: '-webkit-linear-gradient(232deg, #F17938, #FF5BDC, #5898dd, #B2FFFD)',
      borderImageSlice: 1,
      borderImageSource: '-webkit-linear-gradient(232deg, #F17938, #FF5BDC, #5898dd, #B2FFFD)',
      borderRadius: 0,
      borderStyle: 'solid',
      borderWidth: '2px',
    },
    heading: {
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      background: '-webkit-linear-gradient(232deg, #F17938, #FF5BDC, #5898dd, #B2FFFD)',
      display: 'inline-block',
    },
  }
}

export const useGradientStyles = () => {
  const theme = useTheme()
  const styles = theme.palette.mode === 'dark' ? colorfulGradientDarkMode() : colorfulGradientLightMode()
  const classes = makeStyles(styles)
  return { classes, styles }
}
