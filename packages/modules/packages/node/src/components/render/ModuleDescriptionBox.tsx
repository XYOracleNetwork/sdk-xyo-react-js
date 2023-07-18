import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { TreeView } from '@mui/lab'
import { styled, Typography } from '@mui/material'
import { FlexBoxProps } from '@xylabs/react-flexbox'
import { ModuleInstance } from '@xyo-network/module'
import { useRef } from 'react'

import { RenderModule } from './RenderModule'

export interface ModuleDescriptionProps extends FlexBoxProps {
  module?: ModuleInstance | null
}
export const ModuleDescriptionBox: React.FC<ModuleDescriptionProps> = ({ module }) => {
  const idRef = useRef<{ idIncrementor: number; ids: string[] }>({ idIncrementor: 0, ids: [] })

  return (
    <>
      {module ? (
        <>
          <Typography variant="h4">Node Configuration</Typography>
          <StyledTreeView
            aria-label="file system navigator"
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
            sx={{ flexGrow: 1 }}
          >
            <RenderModule module={module} idRef={idRef} />
          </StyledTreeView>
        </>
      ) : module === null ? (
        <Typography variant="h4">Node loading...</Typography>
      ) : (
        <Typography variant="h4">Node not found</Typography>
      )}
    </>
  )
}

const StyledTreeView = styled(TreeView, { name: 'StyledTreeView' })(() => ({
  height: 'auto',
  maxWidth: 'auto',
}))
