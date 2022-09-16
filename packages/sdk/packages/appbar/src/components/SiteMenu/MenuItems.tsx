import { ButtonBase, ButtonBaseProps, ListItem, ListItemProps, ListItemText, ListItemTextProps } from '@mui/material'
import { ListItemButtonEx, ListItemButtonExProps } from '@xyo-network/react-shared'
import { ReactNode } from 'react'
import { To } from 'react-router-dom'

interface SiteMenuListItemBase {
  iconOnly?: boolean
}

export interface SiteMenuListItemProps extends SiteMenuListItemBase, ListItemProps {
  primary: ListItemTextProps['primary']
  to?: To
  icon?: ReactNode
  onButtonClick?: ListItemButtonExProps['onClick']
}

export const SiteMenuListItem: React.FC<SiteMenuListItemProps> = ({ style, children, iconOnly, icon, primary, onButtonClick, ...props }) => {
  return (
    <MenuListItem style={style} {...props}>
      <MenuListItemButtonEx iconOnly={iconOnly} onClick={onButtonClick}>
        <MenuListItemButtonBaseEx iconOnly={iconOnly} icon={icon} />
        <MenuListItemText primary={primary} iconOnly={iconOnly} />
      </MenuListItemButtonEx>
      {children}
    </MenuListItem>
  )
}

interface MenuListItem extends SiteMenuListItemBase, ListItemProps {}

const MenuListItem: React.FC<MenuListItem> = ({ children, style, iconOnly, ...props }) => {
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

interface MenuListItemButtonExProps extends SiteMenuListItemBase, ListItemButtonExProps {}

const MenuListItemButtonEx: React.FC<MenuListItemButtonExProps> = ({ iconOnly, sx, children, ...props }) => {
  const listItemButtonSx = iconOnly ? { borderRadius: '50%', display: 'inline-flex' } : {}
  return (
    <ListItemButtonEx sx={{ ...listItemButtonSx, ...sx }} {...props}>
      {children}
    </ListItemButtonEx>
  )
}

interface MenuListItemButtonBaseExProps extends SiteMenuListItemBase, ButtonBaseProps {
  icon?: ReactNode
}

const MenuListItemButtonBaseEx: React.FC<MenuListItemButtonBaseExProps> = ({ iconOnly, icon, ...props }) => {
  return (
    <ButtonBase sx={{ mr: iconOnly ? 0 : 1 }} disableRipple {...props}>
      {icon}
    </ButtonBase>
  )
}

interface MenuListItemTextProps extends SiteMenuListItemBase, ListItemTextProps {}

const MenuListItemText: React.FC<MenuListItemTextProps> = ({ iconOnly, sx, ...props }) => {
  const listItemTextSxProps = iconOnly ? { visibility: 'hidden', width: 0, ...sx } : {}
  return <ListItemText sx={{ ...listItemTextSxProps, ...sx }} {...props} />
}
