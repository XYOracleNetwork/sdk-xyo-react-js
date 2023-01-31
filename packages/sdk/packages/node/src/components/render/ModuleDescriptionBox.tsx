import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { TreeView } from '@mui/lab'
import { styled, Typography } from '@mui/material'
import { FlexBoxProps } from '@xylabs/react-flexbox'
import { ModuleDescription } from '@xyo-network/module'
import isEmpty from 'lodash/isEmpty'
import { useRef } from 'react'

import { RenderModule } from './RenderModule'

export interface ModuleDescriptionProps extends FlexBoxProps {
  moduleDescription?: ModuleDescription
}
export const ModuleDescriptionBox: React.FC<ModuleDescriptionProps> = ({ moduleDescription }) => {
  const idRef = useRef<{ idIncrementor: number; ids: string[] }>({ idIncrementor: 0, ids: [] })

  return (
    <>
      {moduleDescription === undefined ? <Typography variant="h4">Node not found</Typography> : null}
      {isEmpty(moduleDescription) ? <Typography>Node has no modules</Typography> : null}
      {!isEmpty(moduleDescription) ? (
        <>
          <Typography variant="h4">Node Configuration</Typography>
          <StyledTreeView
            aria-label="file system navigator"
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
            sx={{ flexGrow: 1 }}
          >
            <RenderModule module={moduleDescription} idRef={idRef} />
          </StyledTreeView>
        </>
      ) : null}
    </>
  )
}

const StyledTreeView = styled(TreeView, { name: 'StyledTreeView' })(() => ({
  height: 'auto',
  maxWidth: 'auto',
}))
