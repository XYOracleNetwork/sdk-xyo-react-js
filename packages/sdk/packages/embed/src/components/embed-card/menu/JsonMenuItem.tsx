import { OpenInNew as OpenInNewIcon } from '@mui/icons-material'
import { ListItemIcon, ListItemText, MenuItem, MenuItemProps } from '@mui/material'

import { useResolvePayload } from '../../../contexts'

export const JsonMenuItem: React.FC<MenuItemProps> = (props) => {
  const { huri } = useResolvePayload()

  return (
    <>
      {huri ?
        <MenuItem title="Source Payload JSON" onClick={() => window.open(huri, '_blank')} {...props}>
          <ListItemText sx={{ mr: 1 }}>JSON</ListItemText>
          <ListItemIcon sx={{ justifyContent: 'end' }}>
            <OpenInNewIcon fontSize="small" />
          </ListItemIcon>
        </MenuItem>
      : null}
    </>
  )
}
