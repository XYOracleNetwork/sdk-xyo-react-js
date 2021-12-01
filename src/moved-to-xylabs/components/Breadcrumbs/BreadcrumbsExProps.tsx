/* eslint-disable @delagen/deprecation/deprecation */
import { BreadcrumbsProps } from '@mui/material'
import { ReactElement } from 'react'

/** @deprecated Moved to @xylabs/sdk-react */
interface BreadcrumbsExProps extends BreadcrumbsProps {
  logo?: string | ReactElement
  path?: string
  titles?: string[]
}

export default BreadcrumbsExProps
