import { ListItemTextProps } from '@mui/material'
import { LinkExProps } from '@xylabs/react-link'
import { ReactNode } from 'react'
import { To } from 'react-router-dom'

export interface NavListItemProps {
  href?: string
  icon?: ReactNode
  onButtonClick?: LinkExProps['onClick']
  primary: ListItemTextProps['primary']
  to?: To
  tooltip?: string
}
