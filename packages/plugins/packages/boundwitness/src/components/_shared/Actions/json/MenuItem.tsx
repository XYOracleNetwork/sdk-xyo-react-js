import { Code } from '@mui/icons-material'
import { ListItemIcon, MenuItem } from '@mui/material'
import { ellipsize } from '@xylabs/eth-address'
import { JsonViewerEx } from '@xyo-network/react-payload-raw-info'
import { usePayloadHash } from '@xyo-network/react-shared'
import type { MouseEventHandler } from 'react'
import React, { useState } from 'react'

import type { ActionMenuItemProps } from '../_shared/index.ts'
import { MenuItemDialog } from '../_shared/index.ts'

export interface BWJsonMenuItemProps extends ActionMenuItemProps {}

export const BWJsonMenuItem: React.FC<BWJsonMenuItemProps> = ({
  boundwitness, onClick, onDialogClose, ...props
}) => {
  const hash = usePayloadHash(boundwitness)

  const [open, setOpen] = useState(false)
  const onClose = () => {
    onDialogClose?.()
    setOpen(false)
  }

  const handleMenuClick: MouseEventHandler<HTMLLIElement> = (e) => {
    onClick?.(e)
    setOpen(true)
  }

  const title = hash ? `JSON for ${ellipsize(hash, 5)}` : 'JSON'

  return (
    <>
      <MenuItem onClick={handleMenuClick} {...props}>
        <ListItemIcon><Code /></ListItemIcon>
        JSON
      </MenuItem>
      <MenuItemDialog open={open} onClose={onClose} dialogTitle={title}>
        <JsonViewerEx value={boundwitness} />
      </MenuItemDialog>
    </>
  )
}
