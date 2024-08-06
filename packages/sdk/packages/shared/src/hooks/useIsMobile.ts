import { useTheme } from '@mui/material'

import { useMediaQuery } from './useMediaQuery.ts'

/** @deprecated use useIsSmall instead */
export const useIsMobile = () => {
  const theme = useTheme()
  return useMediaQuery(theme.breakpoints.down('md'))
}

export const useIsSmall = () => {
  const theme = useTheme()
  return useMediaQuery(theme.breakpoints.down('md'))
}
