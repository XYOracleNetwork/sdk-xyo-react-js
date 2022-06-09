import SettingsIcon from '@mui/icons-material/Settings'
import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material'
import { ListItemButtonEx } from '@xyo-network/react-shared'

export const DefaultMenuItems: React.FC = () => {
  return (
    <List>
      <ListItem disablePadding>
        <ListItemButtonEx to="/settings">
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItemButtonEx>
      </ListItem>
    </List>
  )
}
