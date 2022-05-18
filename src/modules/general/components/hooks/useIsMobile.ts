import { useTheme } from '@mui/material'

import { useMediaQuery } from './useMediaQuery'

export const useIsMobile = () => {
  const theme = useTheme()
  return useMediaQuery(theme.breakpoints.down('md'))
}
