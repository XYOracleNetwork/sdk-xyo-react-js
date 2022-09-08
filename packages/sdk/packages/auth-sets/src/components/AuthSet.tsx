import { Avatar, ListItem, ListItemAvatar, ListItemProps, ListItemText, useTheme } from '@mui/material'
import { Identicon } from '@xylabs/react-identicon'

export interface AuthSetListItemProps extends ListItemProps {
  account?: string
  issuer?: string
}

export const AuthSetListItem: React.FC<AuthSetListItemProps> = ({ account, issuer, ...props }) => {
  const theme = useTheme()
  return (
    <ListItem {...props}>
      <ListItemAvatar>
        <Avatar sx={{ bgcolor: theme.palette.action.active }} aria-label="AuthSet">
          <Identicon size={24} value={account} />
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={issuer} secondary={account} />
    </ListItem>
  )
}
