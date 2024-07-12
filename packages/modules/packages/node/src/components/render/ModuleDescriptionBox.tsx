import { ChevronRight as ChevronRightIcon, ExpandMore as ExpandMoreIcon } from '@mui/icons-material'
import { styled, Typography } from '@mui/material'
import { TreeView } from '@mui/x-tree-view'
import { FlexBoxProps } from '@xylabs/react-flexbox'
import { ModuleInstance } from '@xyo-network/module-model'
import { useRef } from 'react'

import { RenderModule } from './RenderModule.js'

export interface ModuleDescriptionProps extends FlexBoxProps {
  mod?: WeakRef<ModuleInstance> | null
}
export const ModuleDescriptionBox: React.FC<ModuleDescriptionProps> = ({ mod }) => {
  const idRef = useRef<{ idIncrementor: number; ids: string[] }>({ idIncrementor: 0, ids: [] })

  return (
    <>
      {mod ?
        <>
          <Typography variant="h4">Node Configuration</Typography>
          <StyledTreeView
            aria-label="file system navigator"
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
            sx={{ flexGrow: 1 }}
          >
            <RenderModule mod={mod} idRef={idRef} />
          </StyledTreeView>
        </>
      : mod === null ?
        <Typography variant="h4">Node loading...</Typography>
      : <Typography variant="h4">Node not found</Typography>}
    </>
  )
}

const StyledTreeView = styled(TreeView, { name: 'StyledTreeView' })(() => ({
  height: 'auto',
  maxWidth: 'auto',
}))
