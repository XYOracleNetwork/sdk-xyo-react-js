import MenuIcon from '@mui/icons-material/Menu'
import SettingsIcon from '@mui/icons-material/Settings'
import { IconButton, List, SwipeableDrawer } from '@mui/material'
import { FlexBoxProps, FlexRow } from '@xylabs/react-flexbox'
import { useEffect, useState } from 'react'

import { MenuListItemContainer } from './MenuListItem'

export interface SiteMenuProps extends FlexBoxProps {
  hideSettingsMenuItem?: boolean
  side?: 'left' | 'right' | 'top' | 'bottom'
  onMenuToggle?: (state?: boolean) => void
}

export const SiteMenu: React.FC<SiteMenuProps> = ({ side = 'right', children, onMenuToggle, ...props }) => {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    onMenuToggle?.(open)
  }, [onMenuToggle, open])

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
      <SwipeableDrawer
        anchor={side}
        open={open}
        onClick={() => setOpen(false)}
        onKeyDown={() => setOpen(false)}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
      >
        {children ?? (
          <List>
            <MenuListItemContainer primary="Settings" icon={<SettingsIcon />} to="/settings" />
          </List>
        )}
      </SwipeableDrawer>
    </FlexRow>
  )
}
