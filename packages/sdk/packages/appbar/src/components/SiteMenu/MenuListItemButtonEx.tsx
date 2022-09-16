import { ListItemButtonEx, ListItemButtonExProps } from '@xyo-network/react-shared'

import { SiteMenuListItemBase } from './lib'

export interface MenuListItemButtonExProps extends SiteMenuListItemBase, ListItemButtonExProps {}

export const MenuListItemButtonEx: React.FC<MenuListItemButtonExProps> = ({ iconOnly, sx, children, ...props }) => {
  const listItemButtonSx = iconOnly ? { borderRadius: '50%', display: 'inline-flex' } : {}
  return (
    <ListItemButtonEx sx={{ ...listItemButtonSx, ...sx }} {...props}>
      {children}
    </ListItemButtonEx>
  )
}
