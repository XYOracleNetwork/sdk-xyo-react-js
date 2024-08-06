import { ArrowRightRounded as ArrowRightRoundedIcon } from '@mui/icons-material'
import { Collapse, IconButton, List, Paper, Typography } from '@mui/material'
import { FlexBoxProps, FlexCol } from '@xylabs/react-flexbox'
import { ArchivistConfig } from '@xyo-network/archivist-model'
import { useState } from 'react'

import { ArchivistParent } from './ArchivistParent.js'

export interface ArchivistParentsProps extends FlexBoxProps {
  config?: ArchivistConfig
}

export const ArchivistParents: React.FC<ArchivistParentsProps> = ({ config, ...props }) => {
  const [parentArchivistCollapse, setParentArchivistCollapse] = useState(false)

  const { commit, read, write } = config?.parents ?? {}

  return (
    <>
      {commit || read || write
        ? (
            <FlexCol alignItems="start" {...props}>
              <span onClick={() => setParentArchivistCollapse(!parentArchivistCollapse)}>
                <Typography variant="subtitle2" sx={{ cursor: 'pointer', display: 'inline-block' }}>
                  Parents
                </Typography>
                <IconButton size="small">
                  <ArrowRightRoundedIcon sx={{ rotate: parentArchivistCollapse ? '90deg' : '0deg', transition: 'all .25s' }} />
                </IconButton>
              </span>
              <Collapse in={parentArchivistCollapse}>
                <Paper elevation={2}>
                  <List>
                    <ArchivistParent archivistType="Commit" parentArchivists={commit} />
                    <ArchivistParent archivistType="Read" parentArchivists={read} />
                    <ArchivistParent archivistType="Write" parentArchivists={write} />
                  </List>
                </Paper>
              </Collapse>
            </FlexCol>
          )
        : null}
    </>
  )
}
