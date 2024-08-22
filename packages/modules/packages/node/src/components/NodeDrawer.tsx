import { Close as CloseIcon } from '@mui/icons-material'
import type { DrawerProps } from '@mui/material'
import {
  ClickAwayListener, Drawer, IconButton,
} from '@mui/material'
import { FlexGrowCol, FlexRow } from '@xylabs/react-flexbox'
import type { WithChildren } from '@xylabs/react-shared'
import { useNodeDrawer } from '@xyo-network/react-node-provider'
import React from 'react'

import { useWeakProvidedNode } from '../hooks/index.ts'
import { ModuleDescriptionBox } from './render/index.ts'

export interface NodeDrawerProps extends WithChildren, Omit<DrawerProps, 'open'> {}

export const NodeDrawer: React.FC<NodeDrawerProps> = ({ children, ...props }) => {
  const { open, setOpen } = useNodeDrawer()
  const [node] = useWeakProvidedNode()

  return (
    <Drawer open={open ?? false} anchor="right" {...props}>
      <ClickAwayListener onClickAway={() => setOpen?.(false)}>
        <FlexGrowCol role="presentation" justifyContent="start" p={2} rowGap={2} minWidth="33vw">
          <FlexRow alignContent="start" justifyContent="start" width="100%">
            <IconButton onClick={() => setOpen?.(false)}>
              <CloseIcon />
            </IconButton>
          </FlexRow>
          <ModuleDescriptionBox mod={node} />
          {children}
        </FlexGrowCol>
      </ClickAwayListener>
    </Drawer>
  )
}
