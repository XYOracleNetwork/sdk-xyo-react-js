import { ListItemProps, ListItemTextProps } from '@mui/material'
import { ReactNode } from 'react'
import { To } from 'react-router-dom-6'

export interface NavListItemProps {
  href?: string
  icon?: ReactNode
  onButtonClick?: ListItemProps['onClick']
  primary: ListItemTextProps['primary']
  to?: To
  tooltip?: string
}
