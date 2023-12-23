import { styled } from '@mui/material'

export const StyledGlowingDiv = styled('div', { name: 'StyledGlowingDiv' })(({ theme }) => {
  const glowAnimationSteps = {
    '0%': {
      boxShadow: `0 0 10px -10px ${theme.palette.secondary.light}`,
    },
    '100%': {
      boxShadow: `0 0 10px -10px ${theme.palette.secondary.light}`,
    },
    '50%': {
      boxShadow: `0 0 10px 10px ${theme.palette.secondary.light}`,
    },
  }
  const glowAnimationProps = {
    animationDuration: '1s',
    animationTimingFunction: 'ease-in-out',
    borderRadius: theme.shape.borderRadius,
  }
  return {
    animationName: 'glow-1',
    ...glowAnimationProps,
    '&.glow-2': {
      ...glowAnimationProps,
      animationName: 'glow-2',
    },
    // prevent the default animation by setting animationName to one that does not exist
    '&.no-glow': {
      animationName: 'none',
    },
    '@keyframes glow-1': {
      ...glowAnimationSteps,
    },
    '@keyframes glow-2': {
      ...glowAnimationSteps,
    },
  }
})
