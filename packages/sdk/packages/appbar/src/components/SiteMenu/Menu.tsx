import { Menu as MenuIcon, Settings as SettingsIcon } from '@mui/icons-material'
import {
  IconButton, List, SwipeableDrawer,
} from '@mui/material'
import type { FlexBoxProps } from '@xylabs/react-flexbox'
import { FlexRow } from '@xylabs/react-flexbox'
import React, { useEffect, useState } from 'react'

import { MenuListItemContainer } from './MenuListItem/index.ts'

export interface SiteMenuProps extends FlexBoxProps {
  hideSettingsMenuItem?: boolean
  onMenuToggle?: (state?: boolean) => void
  side?: 'left' | 'right' | 'top' | 'bottom'
}

export const SiteMenu: React.FC<SiteMenuProps> = ({
  children, onMenuToggle, side = 'right', ...props
}) => {
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
