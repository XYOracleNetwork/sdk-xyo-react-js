import { ListItemProps, ListItemTextProps } from '@mui/material'
import { ListItemButtonExProps } from '@xyo-network/react-shared'
import { ReactNode } from 'react'
import { To } from 'react-router-dom'

import { SiteMenuListItemBase } from './lib'
import { MenuIcon } from './MenuIcon'
import { MenuListItem } from './MenuListItem'
import { MenuListItemButtonEx } from './MenuListItemButtonEx'
import { MenuListItemText } from './MenuListItemText'

export interface SiteMenuListItemProps extends SiteMenuListItemBase, ListItemProps {
  primary: ListItemTextProps['primary']
  to?: To
  icon?: ReactNode
  onButtonClick?: ListItemButtonExProps['onClick']
}

export const SiteMenuListItem: React.FC<SiteMenuListItemProps> = ({
  style,
  children,
  iconOnly,
  collapseEnd,
  icon,
  primary,
  onButtonClick,
  ...props
}) => {
  const { dense } = props
  return (
    <MenuListItem style={style} iconOnly={iconOnly} {...props}>
      <MenuListItemButtonEx iconOnly={iconOnly} onClick={onButtonClick} collapseEnd={collapseEnd} dense={dense}>
        <MenuIcon icon={icon} />
        <MenuListItemText primary={primary} iconOnly={iconOnly} />
      </MenuListItemButtonEx>
      {children}
    </MenuListItem>
  )
}
