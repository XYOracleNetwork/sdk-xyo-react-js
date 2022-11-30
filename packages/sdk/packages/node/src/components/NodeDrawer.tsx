import CloseIcon from '@mui/icons-material/Close'
import { ClickAwayListener, Drawer, DrawerProps, IconButton } from '@mui/material'
import { FlexGrowCol, FlexRow } from '@xylabs/react-flexbox'
import { useAsyncEffect, WithChildren } from '@xylabs/react-shared'
import { ModuleDescription } from '@xyo-network/module'
import { useState } from 'react'

import { useNode, useNodeDrawer } from '../contexts'
import { ModuleDescriptionBox } from './render'

export interface NodeDrawerProps extends WithChildren, Omit<DrawerProps, 'open'> {}

export const NodeDrawer: React.FC<NodeDrawerProps> = ({ children, ...props }) => {
  const { open, setOpen } = useNodeDrawer()
  const [node] = useNode()
  const [moduleDescription, setModuleDescription] = useState<ModuleDescription>()

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async () => {
      if (node) {
        const nodeDescription = await node.description()
        setModuleDescription(nodeDescription)
      }
    },
    [node],
  )

  return (
    <Drawer open={open ?? false} anchor="right" {...props}>
      <ClickAwayListener onClickAway={() => setOpen?.(false)}>
        <FlexGrowCol role="presentation" justifyContent="start" p={2} rowGap={2} minWidth="33vw">
          <FlexRow alignContent="start" justifyContent="start" width="100%">
            <IconButton onClick={() => setOpen?.(false)}>
              <CloseIcon />
            </IconButton>
          </FlexRow>
          <ModuleDescriptionBox moduleDescription={moduleDescription} />
          {children}
        </FlexGrowCol>
      </ClickAwayListener>
    </Drawer>
  )
}
