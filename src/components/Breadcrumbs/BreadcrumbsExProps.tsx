import { BreadcrumbsProps } from '@material-ui/core'
import { ReactElement } from 'react'

interface BreadcrumbsExProps extends BreadcrumbsProps {
  logo?: string | ReactElement
  path?: string
  titles?: string[]
}

export default BreadcrumbsExProps
