import CloseIcon from '@mui/icons-material/Close'
import { ClickAwayListener, Drawer, DrawerProps, IconButton } from '@mui/material'
import { FlexGrowCol, FlexRow } from '@xylabs/react-flexbox'
import { WithChildren } from '@xylabs/react-shared'

import { useNodeDrawer } from '../contexts'
import { useProvidedNode } from '../hooks'
import { ModuleDescriptionBox } from './render'

export interface NodeDrawerProps extends WithChildren, Omit<DrawerProps, 'open'> {}

export const NodeDrawer: React.FC<NodeDrawerProps> = ({ children, ...props }) => {
  const { open, setOpen } = useNodeDrawer()
  const node = useProvidedNode()

  return (
    <Drawer open={open ?? false} anchor="right" {...props}>
      <ClickAwayListener onClickAway={() => setOpen?.(false)}>
        <FlexGrowCol role="presentation" justifyContent="start" p={2} rowGap={2} minWidth="33vw">
          <FlexRow alignContent="start" justifyContent="start" width="100%">
            <IconButton onClick={() => setOpen?.(false)}>
              <CloseIcon />
            </IconButton>
          </FlexRow>
          <ModuleDescriptionBox module={node} />
          {children}
        </FlexGrowCol>
      </ClickAwayListener>
    </Drawer>
  )
}
