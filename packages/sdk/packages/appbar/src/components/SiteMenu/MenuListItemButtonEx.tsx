import { ListItemButtonEx, ListItemButtonExProps } from '@xyo-network/react-shared'

import { SiteMenuListItemBase } from './lib'

export interface MenuListItemButtonExProps extends SiteMenuListItemBase, ListItemButtonExProps {}

export const MenuListItemButtonEx: React.FC<MenuListItemButtonExProps> = ({ iconOnly, collapseEnd, sx, children, ...props }) => {
  const { dense } = props
  const listItemButtonSx = iconOnly ? { borderRadius: '50%', display: 'inline-flex', flexGrow: 0 } : {}
  const spacingSx = collapseEnd ? { columnGap: 0 } : { columnGap: 1.5 }
  const paddingSx = dense ? { px: 0.5 } : { px: 0.75 }
  return (
    <ListItemButtonEx sx={{ ...listItemButtonSx, ...spacingSx, ...paddingSx, ...sx }} {...props}>
      {children}
    </ListItemButtonEx>
  )
}
