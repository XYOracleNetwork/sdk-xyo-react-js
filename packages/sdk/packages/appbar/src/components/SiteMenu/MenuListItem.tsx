import { ListItem, ListItemProps } from '@mui/material'

import { SiteMenuListItemBase } from './lib'

export interface MenuListItem extends SiteMenuListItemBase, ListItemProps {}

export const MenuListItem: React.FC<MenuListItem> = ({ children, style, iconOnly, ...props }) => {
  const listItemStyles = {
    display: iconOnly ? 'inline' : 'block',
    width: iconOnly ? 'auto' : '100%',
  }
  return (
    <ListItem style={{ ...listItemStyles, ...style }} {...props}>
      {children}
    </ListItem>
  )
}
