import { makeStyles } from '@mui/styles'

export const colorfulGradientLightMode = makeStyles(() => ({
  background: {
    backgroundImage: '-webkit-linear-gradient(232deg, #e17751, #d84e7a, #5898dd, #8c8ee5)',
  },
  heading: {
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    background: '-webkit-linear-gradient(232deg, #e17751, #d84e7a, #5898dd, #8c8ee5)',
    display: 'inline-block',
  },
}))

export const colorfulGradientDarkMode = makeStyles(() => ({
  background: {
    backgroundImage: '-webkit-linear-gradient(232deg, #F17938, #FF5BDC, #5898dd, #B2FFFD)',
  },
  heading: {
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    background: '-webkit-linear-gradient(232deg, #F17938, #FF5BDC, #5898dd, #B2FFFD)',
    display: 'inline-block',
  },
}))

export const networkGradient = makeStyles(() => ({
  background: {
    backgroundImage: '-webkit-linear-gradient(232deg, #e17751, #d84e7a, #5898dd, #8c8ee5)',
  },
  heading: {
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    background: '-webkit-linear-gradient(232deg, #e17751, #d84e7a, #5898dd, #8c8ee5)',
    display: 'inline-block',
  },
}))

export const developerGradient = makeStyles(() => ({
  heading: {
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    background: '-webkit-linear-gradient(232deg, #5898dd, #8c8ee5, #3520B2)',
    display: 'inline-block',
  },
}))

export const partnershipGradient = makeStyles(() => ({
  heading: {
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    background: '-webkit-linear-gradient(232deg, #e17751, #d84e7a, #5898dd, #8c8ee5, #3520B2)',
    display: 'inline-block',
  },
}))
