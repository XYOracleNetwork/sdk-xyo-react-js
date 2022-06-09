import { ListItem, ListItemIcon, ListItemProps, ListItemText, ListItemTextProps } from '@mui/material'
import { ListItemButtonEx, ListItemButtonExProps } from '@xyo-network/react-shared'
import { ReactNode } from 'react'
import { To } from 'react-router-dom'

export interface DrawerListItemProps extends ListItemProps {
  primary: ListItemTextProps['primary']
  to?: To
  icon?: ReactNode
  onButtonClick?: ListItemButtonExProps['onClick']
}

export const DrawerListItem: React.FC<DrawerListItemProps> = ({ children, primary, to, icon, onButtonClick, ...props }) => {
  return (
    <ListItem {...props}>
      <ListItemButtonEx to={to} onClick={onButtonClick}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={primary} />
      </ListItemButtonEx>
      {children}
    </ListItem>
  )
}
