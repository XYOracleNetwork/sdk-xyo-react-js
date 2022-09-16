import { ListItem, ListItemIcon, ListItemProps, ListItemText, ListItemTextProps } from '@mui/material'
import { ListItemButtonEx, ListItemButtonExProps } from '@xyo-network/react-shared'
import { ReactNode } from 'react'
import { To } from 'react-router-dom'

export interface SiteMenuListItemProps extends ListItemProps {
  primary: ListItemTextProps['primary']
  to?: To
  icon?: ReactNode
  onButtonClick?: ListItemButtonExProps['onClick']
  minIconWidth?: number
}

export const SiteMenuListItem: React.FC<SiteMenuListItemProps> = ({ style, children, primary, to, icon, minIconWidth, onButtonClick, ...props }) => {
  const listItemIconProps = minIconWidth !== undefined ? { style: { minWidth: `${minIconWidth}px` } } : {}
  console.log(listItemIconProps)
  return (
    <ListItem style={{ display: 'block', ...style }} {...props}>
      <ListItemButtonEx to={to} onClick={onButtonClick}>
        <ListItemIcon {...listItemIconProps}>{icon}</ListItemIcon>
        <ListItemText primary={primary} />
      </ListItemButtonEx>
      {children}
    </ListItem>
  )
}
