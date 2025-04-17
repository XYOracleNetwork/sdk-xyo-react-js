import { Link } from '@mui/icons-material'
import { ListItemIcon, MenuItem } from '@mui/material'
import type { MouseEventHandler } from 'react'
import React, { useState } from 'react'

import type { ActionMenuItemProps } from '../_shared/index.ts'
import { MenuItemDialog } from '../_shared/index.ts'
import { PreviousHashDialogContent } from './DialogContent.tsx'

export interface BWPreviousHashMenuItemProps extends ActionMenuItemProps {}

export const BWPreviousHashMenuItem: React.FC<BWPreviousHashMenuItemProps> = ({
  boundwitness, onClick, onDialogClose, ...props
}) => {
  const [open, setOpen] = useState(false)
  const onClose = () => {
    onDialogClose?.()
    setOpen(false)
  }

  const handleMenuClick: MouseEventHandler<HTMLLIElement> = (e) => {
    onClick?.(e)
    setOpen(true)
  }

  return (
    <>
      <MenuItem onClick={handleMenuClick} {...props}>
        <ListItemIcon><Link /></ListItemIcon>
        Previous Hash
      </MenuItem>
      <MenuItemDialog open={open} onClose={onClose} dialogTitle="Previous Hash">
        <PreviousHashDialogContent boundwitness={boundwitness} />
      </MenuItemDialog>
    </>
  )
}
