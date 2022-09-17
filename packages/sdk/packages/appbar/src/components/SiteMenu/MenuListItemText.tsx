import { ListItemText, ListItemTextProps } from '@mui/material'

import { SiteMenuListItemBase } from './lib'

export interface MenuListItemTextProps extends SiteMenuListItemBase, ListItemTextProps {}

export const MenuListItemText: React.FC<MenuListItemTextProps> = ({ iconOnly, sx, ...props }) => {
  const listItemTextSxProps = iconOnly ? { maxWidth: 0, ...sx } : { ...sx }
  return (
    <ListItemText
      sx={{
        flexGrow: 0,
        maxWidth: '100%',
        overflow: 'hidden',
        transition: 'max-width 300ms linear',
        ...listItemTextSxProps,
      }}
      {...props}
    />
  )
}
