import { ListItemTextProps } from '@mui/material'
import { LinkExProps } from '@xylabs/react-link'
import { ReactNode } from 'react'
import { To } from 'react-router-dom'

export interface NavListItemProps {
  primary: ListItemTextProps['primary']
  to?: To
  href?: string
  icon?: ReactNode
  onButtonClick?: LinkExProps['onClick']
  tooltip?: string
}
