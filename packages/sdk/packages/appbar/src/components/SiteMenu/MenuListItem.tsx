import { ListItem, ListItemProps } from '@mui/material'

import { SiteMenuListItemBase } from './lib'

export interface ListItemExProps extends SiteMenuListItemBase, ListItemProps {}

export const MenuListItem: React.FC<ListItemExProps> = ({ iconOnly, collapseEnd, sx, children, ...props }) => {
  const dense = props

  const listItemSx = iconOnly ? { borderRadius: '50%', display: 'inline-flex', flexGrow: 0, width: 'auto' } : { width: '100%' }
  // wait till collapseEnds to remove the spacing between items
  const spacingSx = collapseEnd ? { columnGap: 0 } : { columnGap: 1.5 }
  // adjusts to the paddingY value which does NOT scale along the theme.spacing
  const paddingSx = dense ? { px: '8px' } : { px: '12px' }
  return (
    <ListItem sx={{ ...listItemSx, ...spacingSx, ...paddingSx, ...sx }} {...props}>
      {children}
    </ListItem>
  )
}
