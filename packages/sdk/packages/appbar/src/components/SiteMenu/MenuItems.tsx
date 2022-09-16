import { ButtonBase, ButtonBaseProps, ListItem, ListItemIcon, ListItemIconProps, ListItemProps, ListItemText, ListItemTextProps } from '@mui/material'
import { ListItemButtonEx, ListItemButtonExProps } from '@xyo-network/react-shared'
import { ReactNode } from 'react'
import { To } from 'react-router-dom'

export interface SiteMenuListItemProps extends ListItemProps {
  primary: ListItemTextProps['primary']
  to?: To
  icon?: ReactNode
  onButtonClick?: ListItemButtonExProps['onClick']
  hideListItemText?: boolean
}

export const SiteMenuListItem: React.FC<SiteMenuListItemProps> = ({
  style,
  children,
  hideListItemText,
  primary,
  to,
  icon,
  onButtonClick,
  ...props
}) => {
  const listItemTextProps = hideListItemText
    ? {
        sx: { visibility: 'hidden', width: 0 },
      }
    : {}
  return (
    <ListItem style={{ display: 'block', ...style }} {...props}>
      <ListItemButtonEx to={to} onClick={onButtonClick}>
        <ButtonBase sx={{ mr: 1 }}>{icon}</ButtonBase>
        <ListItemText primary={primary} {...listItemTextProps} />
      </ListItemButtonEx>
      {children}
    </ListItem>
  )
}
