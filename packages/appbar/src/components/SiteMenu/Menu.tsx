import MenuIcon from '@mui/icons-material/Menu'
import SettingsIcon from '@mui/icons-material/Settings'
import { Box, IconButton, List, SwipeableDrawer } from '@mui/material'
import { FlexBoxProps, FlexRow } from '@xylabs/sdk-react'
import { useState } from 'react'

import { SiteMenuListItem } from './MenuItems'

export interface SiteMenuProps extends FlexBoxProps {
  hideSettingsMenuItem?: boolean
  side?: 'left' | 'right' | 'top' | 'bottom'
}

export const SiteMenu: React.FC<SiteMenuProps> = ({ side = 'right', children, ...props }) => {
  const [open, setOpen] = useState(false)

  return (
    <FlexRow alignItems="stretch" {...props}>
      <IconButton
        size="small"
        color="inherit"
        onClick={() => {
          setOpen(!open)
        }}
      >
        <MenuIcon fontSize="large" />
      </IconButton>
      <SwipeableDrawer anchor={side} open={open} onClick={() => setOpen(false)} onKeyDown={() => setOpen(false)} onClose={() => setOpen(false)} onOpen={() => setOpen(true)}>
        {children ?? (
          <List>
            <SiteMenuListItem primary="Settings" icon={<SettingsIcon />} to="/settings" />
          </List>
        )}
      </SwipeableDrawer>
    </FlexRow>
  )
}
