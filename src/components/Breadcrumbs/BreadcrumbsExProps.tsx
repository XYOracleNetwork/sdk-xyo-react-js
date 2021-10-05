import { BreadcrumbsProps } from '@mui/material'
import { ReactElement } from 'react'

interface BreadcrumbsExProps extends BreadcrumbsProps {
  logo?: string | ReactElement
  path?: string
  titles?: string[]
}

export default BreadcrumbsExProps
