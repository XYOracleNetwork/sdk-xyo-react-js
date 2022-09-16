import { ListItem, ListItemProps } from '@mui/material'

import { SiteMenuListItemBase } from './lib'

export interface MenuListItemProps extends SiteMenuListItemBase, ListItemProps {}

export const MenuListItem: React.FC<MenuListItemProps> = ({ children, style, iconOnly, ...props }) => {
  const listItemStyles = {
    display: iconOnly ? 'inline-flex' : 'block',
    width: iconOnly ? 'auto' : '100%',
  }
  return (
    <ListItem style={{ ...listItemStyles, ...style }} {...props}>
      {children}
    </ListItem>
  )
}
