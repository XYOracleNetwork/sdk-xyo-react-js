import {
  keyframes, styled, Typography,
} from '@mui/material'

const moveBg = keyframes(`
    0% {
      background-position: 0% 0%;
    }
    100% {
      background-position: 100% 0%;
    }
`)

/**
 * Adapted from - https://codepen.io/web-dot-dev/pen/vYrGPNE
 */
export const AnimatedGradientTypography = styled(Typography, { name: 'AnimatedGradientTypography' })(({ theme }) => ({
  'fontWeight': 'bold',
  '--color-one': theme.palette.secondary.dark,
  '--color-two': theme.palette.primary.light,
  'background': `linear-gradient(
      .25turn,
      var(--color-one),
      var(--color-two),
      var(--color-one)
    )`,
  'color': 'transparent',
  'backgroundClip': 'text',
  'backgroundSize': '800%',
  '@media (prefers-reduced-motion: no-preference)': {
    animationName: moveBg,
    animationDirection: 'reverse',
    animationDuration: '2s',
    animationIterationCount: 'infinite',
  },
}))
