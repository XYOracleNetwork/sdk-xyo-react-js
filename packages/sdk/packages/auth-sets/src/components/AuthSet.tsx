import DeleteIcon from '@mui/icons-material/Delete'
import Error from '@mui/icons-material/Error'
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked'
import { Avatar, IconButton, ListItem, ListItemAvatar, ListItemProps, ListItemText, useTheme } from '@mui/material'
import { FlexRow } from '@xylabs/react-flexbox'
import { Identicon } from '@xylabs/react-identicon'

type SecondaryActionsProps = Pick<AuthSetListItemProps, 'active' | 'onRemove' | 'reAuth'>

const SecondaryActions: React.FC<SecondaryActionsProps> = ({ active, onRemove, reAuth }) => {
  return (
    <FlexRow columnGap={1}>
      {active ? <RadioButtonCheckedIcon color="success" titleAccess="Active Account" /> : null}
      {reAuth ? <Error color="warning" titleAccess="Please login again" /> : null}
      {onRemove ? (
        <IconButton onClick={() => onRemove()} title="Remove account">
          <DeleteIcon />
        </IconButton>
      ) : null}
    </FlexRow>
  )
}

export interface AuthSetListItemProps extends ListItemProps {
  account?: string
  active?: boolean
  identifier?: string
  issuer?: string
  onRemove?: () => boolean | undefined
  reAuth?: boolean
}

export const AuthSetListItem: React.FC<AuthSetListItemProps> = ({ account, active, identifier, issuer, onRemove, reAuth, ...props }) => {
  const theme = useTheme()
  return (
    <ListItem secondaryAction={<SecondaryActions active={active} onRemove={onRemove} reAuth={reAuth} />} {...props}>
      <ListItemAvatar>
        <Avatar sx={{ bgcolor: theme.palette.action.active }} aria-label="AuthSet">
          <Identicon size={24} value={account} title={account} />
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={issuer} secondary={identifier} />
    </ListItem>
  )
}
