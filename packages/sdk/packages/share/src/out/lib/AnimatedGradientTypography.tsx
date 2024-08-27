import {
  keyframes, styled, Typography,
} from '@mui/material'

const moveBg = keyframes(`
  to {
    background-position: var(--bg-size) 0;
  }
`)

/**
 * Adapted from - https://codepen.io/web-dot-dev/pen/vYrGPNE
 */
export const AnimatedGradientTypography = styled(Typography, { name: 'AnimatedGradientTypography' })(({ theme }) => ({
  'fontWeight': 'bold',
  '--bg-size': '400%',
  '--color-one': theme.palette.primary.main,
  '--color-two': theme.palette.secondary.main,
  'background': `linear-gradient(
      90deg,
      var(--color-one),
      var(--color-two),
      var(--color-one)
    )
    0 0 / var(--bg-size) 100%`,
  'color': 'transparent',
  'backgroundClip': 'text',
  '@media (prefers-reduced-motion: no-preference)': { animation: `${moveBg} 8s linear infinite` },
}))
