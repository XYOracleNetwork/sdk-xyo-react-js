import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked'
import { Avatar, ListItem, ListItemAvatar, ListItemProps, ListItemText, useTheme } from '@mui/material'
import { Identicon } from '@xylabs/react-identicon'

export interface AuthSetListItemProps extends ListItemProps {
  account?: string
  issuer?: string
  identifier?: string
  active?: boolean
}

export const AuthSetListItem: React.FC<AuthSetListItemProps> = ({ account, active, identifier, issuer, ...props }) => {
  const theme = useTheme()
  return (
    <ListItem secondaryAction={active ? <RadioButtonCheckedIcon color="success" /> : null} {...props}>
      <ListItemAvatar>
        <Avatar sx={{ bgcolor: theme.palette.action.active }} aria-label="AuthSet">
          <Identicon size={24} value={account} title={account} />
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={issuer} secondary={identifier} />
    </ListItem>
  )
}
