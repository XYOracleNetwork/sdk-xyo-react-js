import { ListItem, ListItemProps } from '@mui/material'

import { SiteMenuListItemBase } from './lib'

export interface ListItemExProps extends SiteMenuListItemBase, ListItemProps {}

export const MenuListItemEx: React.FC<ListItemExProps> = ({ iconOnly, collapseEnd, sx, children, ...props }) => {
  const dense = props
  const listItemButtonSx = iconOnly ? { borderRadius: '50%', display: 'inline-flex', flexGrow: 0 } : {}
  // wait till collapseEnds to remove the spacing between items
  const spacingSx = collapseEnd ? { columnGap: 0 } : { columnGap: 1.5 }
  // adjusts to the paddingY value which does NOT scale along the theme.spacing
  const paddingSx = dense ? { px: '8px' } : { px: '12px' }
  return (
    <ListItem sx={{ ...listItemButtonSx, ...spacingSx, ...paddingSx, ...sx }} {...props}>
      {children}
    </ListItem>
  )
}
