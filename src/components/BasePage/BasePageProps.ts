import { BoxProps } from '@material-ui/core'
import { ReactElement } from 'react'

import { AppBarExProps } from '../AppBarEx'

interface BasePageProps extends BoxProps {
  appBar?: ReactElement<AppBarExProps>
  appFooter?: ReactElement
  beta?: boolean
  container?: 'xl' | 'lg' | 'md' | 'sm' | 'xs'
  hideFooter?: boolean
  noindex?: boolean
  title?: string
}

export default BasePageProps
