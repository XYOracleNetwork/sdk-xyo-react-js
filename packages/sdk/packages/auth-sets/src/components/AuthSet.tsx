import { Avatar, ListItem, ListItemAvatar, ListItemProps, ListItemText, useTheme } from '@mui/material'
import { Identicon } from '@xylabs/react-identicon'

export interface AuthSetListItemProps extends ListItemProps {
  currentAccount?: string
  issuer?: string
}

export const AuthSetListItem: React.FC<AuthSetListItemProps> = ({ currentAccount, issuer, ...props }) => {
  const theme = useTheme()
  return (
    <ListItem {...props}>
      <ListItemAvatar>
        <Avatar sx={{ bgcolor: theme.palette.action.active }} aria-label="AuthSet">
          <Identicon size={24} value={currentAccount} />
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={issuer} secondary={currentAccount} />
    </ListItem>
  )
}
