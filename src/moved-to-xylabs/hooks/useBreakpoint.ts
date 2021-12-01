/* eslint-disable @delagen/deprecation/deprecation */
import { useMediaQuery, useTheme } from '@mui/material'

/** @deprecated switch to useMediaQuery */
const useBreakpoint = () => {
  const theme = useTheme()
  const xs = useMediaQuery(theme.breakpoints.only('xs'))
  const sm = useMediaQuery(theme.breakpoints.only('sm'))
  const md = useMediaQuery(theme.breakpoints.only('md'))
  const lg = useMediaQuery(theme.breakpoints.only('lg'))
  const xl = useMediaQuery(theme.breakpoints.only('xl'))

  if (xs) {
    return 'xs'
  } else if (sm) {
    return 'sm'
  } else if (md) {
    return 'md'
  } else if (lg) {
    return 'lg'
  } else if (xl) {
    return 'xl'
  }
}

export default useBreakpoint
