import MenuIcon from '@mui/icons-material/Menu'
import { Box, IconButton, SwipeableDrawer } from '@mui/material'
import { FlexBoxProps, FlexRow } from '@xylabs/sdk-react'
import { ReactNode, useState } from 'react'
import { To } from 'react-router-dom'

import { DefaultMenuItems } from './DefaultMenuItems'

export interface SiteMenuItem {
  name: string
  to?: To
  href?: string
  onClick?: () => void
}

export interface SiteMenuProps extends FlexBoxProps {
  hideSettingsMenuItem?: boolean
  menu?: ReactNode
  side?: 'left' | 'right' | 'top' | 'bottom'
}

export const SiteMenu: React.FC<SiteMenuProps> = ({ side, menu, ...props }) => {
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
      <SwipeableDrawer anchor={side ?? 'left'} open={open} onClose={() => setOpen(false)} onOpen={() => setOpen(true)}>
        <Box width="auto" role="presentation" onClick={() => setOpen(false)} onKeyDown={() => setOpen(false)}>
          {menu ?? <DefaultMenuItems />}
        </Box>
      </SwipeableDrawer>
    </FlexRow>
  )
}
