import { ListItemButtonEx, ListItemButtonExProps } from '@xyo-network/react-shared'

import { SiteMenuListItemBase } from './lib'

export interface MenuListItemButtonExProps extends SiteMenuListItemBase, ListItemButtonExProps {}

export const MenuListItemButtonEx: React.FC<MenuListItemButtonExProps> = ({ iconOnly, collapseEnd, sx, children, ...props }) => {
  const { dense } = props
  const listItemButtonSx = iconOnly ? { borderRadius: '50%', display: 'inline-flex', flexGrow: 0 } : {}
  const spacingSx = collapseEnd ? { columnGap: 0 } : { columnGap: 1.5 }
  // adjusts to the paddingY value which does NOT scale along the theme.spacing
  const paddingSx = dense ? { px: '8px' } : { px: '12px' }
  return (
    <ListItemButtonEx sx={{ ...listItemButtonSx, ...spacingSx, ...paddingSx, ...sx }} {...props}>
      {children}
    </ListItemButtonEx>
  )
}
