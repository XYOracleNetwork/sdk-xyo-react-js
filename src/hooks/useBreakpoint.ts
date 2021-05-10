import { useTheme } from '@material-ui/core'

const useBreakpoint = () => {
  const theme = useTheme()

  if (theme.breakpoints.only('xs')) {
    return 'xs'
  } else if (theme.breakpoints.only('sm')) {
    return 'sm'
  } else if (theme.breakpoints.only('md')) {
    return 'md'
  } else if (theme.breakpoints.only('lg')) {
    return 'lg'
  } else if (theme.breakpoints.only('xl')) {
    return 'xl'
  }
}

export default useBreakpoint
