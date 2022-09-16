import { ButtonBase, ButtonBaseProps } from '@mui/material'
import { ReactNode } from 'react'

import { SiteMenuListItemBase } from './lib'

export interface MenuListItemButtonBaseExProps extends SiteMenuListItemBase, ButtonBaseProps {
  icon?: ReactNode
}

export const MenuListItemButtonBaseEx: React.FC<MenuListItemButtonBaseExProps> = ({ iconOnly, icon, ...props }) => {
  return (
    <ButtonBase sx={{ mr: iconOnly ? 0 : 1 }} disableRipple {...props}>
      {icon}
    </ButtonBase>
  )
}
