import { Typography } from '@mui/material'
import { TypographyExProps } from '@xyo-network/react-shared'
import { ReactNode } from 'react'

import { SiteMenuListItemBase } from './lib'

export interface MenuIconProps extends SiteMenuListItemBase, TypographyExProps {
  icon?: ReactNode
}

export const MenuIcon: React.FC<MenuIconProps> = ({ iconOnly, icon, ...props }) => {
  return (
    <Typography mr={iconOnly ? 0 : 1} display="flex" variant="caption" {...props}>
      {icon}
    </Typography>
  )
}
