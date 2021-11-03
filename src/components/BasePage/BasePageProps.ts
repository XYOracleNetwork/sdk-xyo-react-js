import { BoxProps } from '@mui/material'
import { ReactElement, ReactNode } from 'react'

import { AppBarExProps } from '../AppBarEx'

interface BasePageProps extends BoxProps {
  appBar?: ReactElement<AppBarExProps>
  appFooter?: ReactElement
  beta?: boolean
  container?: 'xl' | 'lg' | 'md' | 'sm' | 'xs'
  disableGutters?: boolean
  hideAppBar?: boolean
  hideFooter?: boolean
  noindex?: boolean
  cookieConsent?: ReactNode
  scrollToTopButton?: boolean
  title?: string
}

export default BasePageProps
