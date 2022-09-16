import { ListItemText, ListItemTextProps } from '@mui/material'

import { SiteMenuListItemBase } from './lib'

export interface MenuListItemTextProps extends SiteMenuListItemBase, ListItemTextProps {}

export const MenuListItemText: React.FC<MenuListItemTextProps> = ({ iconOnly, sx, ...props }) => {
  const listItemTextSxProps = iconOnly ? { visibility: 'hidden', width: 0, ...sx } : {}
  return <ListItemText sx={{ ...listItemTextSxProps, ...sx }} {...props} />
}
