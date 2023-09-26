import { MoreVert as MoreVertIcon } from '@mui/icons-material'
import { IconButton, IconButtonProps, Menu } from '@mui/material'
import { useState } from 'react'

import { JsonMenuItem } from './JsonMenuItem'

export const EmbedMenu: React.FC<IconButtonProps> = (props) => {
  // TODO - link to explore website
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <IconButton onClick={handleClick} {...props}>
        <MoreVertIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose} PaperProps={{ variant: 'elevation' }} MenuListProps={{ dense: true }}>
        <JsonMenuItem />
      </Menu>
    </>
  )
}
