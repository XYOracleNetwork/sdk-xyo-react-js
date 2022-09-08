import DeleteIcon from '@mui/icons-material/Delete'
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked'
import { Avatar, IconButton, ListItem, ListItemAvatar, ListItemProps, ListItemText, useTheme } from '@mui/material'
import { FlexRow } from '@xylabs/react-flexbox'
import { Identicon } from '@xylabs/react-identicon'

type SecondaryActionsProps = Pick<AuthSetListItemProps, 'active' | 'onRemove'>

const SecondaryActions: React.FC<SecondaryActionsProps> = ({ active, onRemove }) => {
  return (
    <FlexRow columnGap={1}>
      {active ? <RadioButtonCheckedIcon color="success" /> : null}
      {onRemove ? (
        <IconButton onClick={() => onRemove()}>
          <DeleteIcon />
        </IconButton>
      ) : null}
    </FlexRow>
  )
}

export interface AuthSetListItemProps extends ListItemProps {
  account?: string
  issuer?: string
  identifier?: string
  active?: boolean
  onRemove?: () => boolean | undefined
}

export const AuthSetListItem: React.FC<AuthSetListItemProps> = ({ account, active, identifier, issuer, onRemove, ...props }) => {
  const theme = useTheme()
  return (
    <ListItem secondaryAction={<SecondaryActions active={active} onRemove={onRemove} />} {...props}>
      <ListItemAvatar>
        <Avatar sx={{ bgcolor: theme.palette.action.active }} aria-label="AuthSet">
          <Identicon size={24} value={account} title={account} />
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={issuer} secondary={identifier} />
    </ListItem>
  )
}
