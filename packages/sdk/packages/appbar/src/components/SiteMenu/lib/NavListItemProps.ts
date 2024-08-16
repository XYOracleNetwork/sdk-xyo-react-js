import type { ListItemProps, ListItemTextProps } from '@mui/material'
import type { ReactNode } from 'react'
import type { To } from 'react-router-dom'

export interface NavListItemProps {
  href?: string
  icon?: ReactNode
  onButtonClick?: ListItemProps['onClick']
  primary: ListItemTextProps['primary']
  to?: To
  tooltip?: string
}
