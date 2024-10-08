import { ChevronRight as ChevronRightIcon, ExpandMore as ExpandMoreIcon } from '@mui/icons-material'
import { styled, Typography } from '@mui/material'
import { SimpleTreeView } from '@mui/x-tree-view'
import type { FlexBoxProps } from '@xylabs/react-flexbox'
import type { ModuleInstance } from '@xyo-network/module-model'
import React, { useRef } from 'react'

import { RenderModule } from './RenderModule.tsx'

export interface ModuleDescriptionProps extends FlexBoxProps {
  mod?: WeakRef<ModuleInstance> | null
}
export const ModuleDescriptionBox: React.FC<ModuleDescriptionProps> = ({ mod }) => {
  const idRef = useRef<{ idIncrementor: number; ids: string[] }>({ idIncrementor: 0, ids: [] })

  return (
    <>
      {mod
        ? (
            <>
              <Typography variant="h4">Node Configuration</Typography>
              <StyledTreeView
                aria-label="file system navigator"
                slots={{ collapseIcon: ExpandMoreIcon, expandIcon: ChevronRightIcon }}
                sx={{ flexGrow: 1 }}
              >
                <RenderModule mod={mod} idRef={idRef} />
              </StyledTreeView>
            </>
          )
        : mod === null
          ? <Typography variant="h4">Node loading...</Typography>
          : <Typography variant="h4">Node not found</Typography>}
    </>
  )
}

const StyledTreeView = styled(SimpleTreeView, { name: 'StyledTreeView' })(() => ({
  height: 'auto',
  maxWidth: 'auto',
}))
