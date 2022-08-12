import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import { ListItemIcon, ListItemText, MenuItem, MenuItemProps } from '@mui/material'

import { useXyoEmbedPluginState } from '../../../contexts'

export const JsonMenuItem: React.FC<MenuItemProps> = (props) => {
  const { huri } = useXyoEmbedPluginState()

  return (
    <>
      {huri ? (
        <MenuItem title="Source Payload JSON" onClick={() => window.open(huri, '_blank')} {...props}>
          <ListItemText sx={{ mr: 1 }}>JSON</ListItemText>
          <ListItemIcon sx={{ justifyContent: 'end' }}>
            <OpenInNewIcon fontSize="small" />
          </ListItemIcon>
        </MenuItem>
      ) : null}
    </>
  )
}
