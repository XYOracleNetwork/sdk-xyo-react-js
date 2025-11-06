import { OpenInNew as OpenInNewIcon } from '@mui/icons-material'
import type { MenuItemProps } from '@mui/material'
import {
  ListItemIcon, ListItemText, MenuItem,
} from '@mui/material'
import { isDefined } from '@xylabs/typeof'
import React from 'react'

import { useResolvePayload } from '../../../contexts/index.ts'

export const JsonMenuItem: React.FC<MenuItemProps> = (props) => {
  const { huri } = useResolvePayload()

  return (
    <>
      {isDefined(huri)
        ? (
            <MenuItem title="Source Payload JSON" onClick={() => window.open(huri, '_blank')} {...props}>
              <ListItemText sx={{ mr: 1 }}>JSON</ListItemText>
              <ListItemIcon sx={{ justifyContent: 'end' }}>
                <OpenInNewIcon fontSize="small" />
              </ListItemIcon>
            </MenuItem>
          )
        : null}
    </>
  )
}
