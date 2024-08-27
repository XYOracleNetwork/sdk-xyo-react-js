import {
  keyframes, styled, Typography,
} from '@mui/material'

/**
 * Start the animation at 100% to give the gradient a left to right effect
 */
const moveBg = keyframes(`
    0% {
      background-position: 100% 0%;
    }
    100% {
      background-position: 0% 0%;
    }
`)

/**
 * Adapted from - https://codepen.io/web-dot-dev/pen/vYrGPNE
 */
export const AnimatedGradientTypography = styled(Typography, { name: 'AnimatedGradientTypography' })(({ theme }) => ({
  // Set the color variables for the gradient
  '--color-one': theme.palette.secondary.dark,
  '--color-two': theme.palette.primary.light,
  // set the gradient so it has the same start and end color for looping effect
  'background': `linear-gradient(
    .25turn,
    var(--color-one),
    var(--color-two),
    var(--color-one)
    )`,
  // Set the text color to transparent so the gradient shows through
  'color': 'transparent',
  // Clip the background to the text shape
  'backgroundClip': 'text',
  // Set the background size to 800% so we don't see the third color initially creating the looping effect
  'backgroundSize': '800%',
  // Set the text to bold so the gradient is more visible
  'fontWeight': 'bold',
  // Set the animation
  '@media (prefers-reduced-motion: no-preference)': {
    animationName: moveBg,
    animationDuration: '2s',
    animationIterationCount: 'infinite',
  },
  // reset for users that prefer reduced motion
  '@media (prefers-reduced-motion)': {
    background: 'none',
    color: theme.palette.text.primary,
  },
}))
