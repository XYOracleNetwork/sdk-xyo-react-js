import ArrowRightRoundedIcon from '@mui/icons-material/ArrowRightRounded'
import { CardContentProps, Collapse, IconButton, List, Paper, Typography } from '@mui/material'
import { useAsyncEffect } from '@xylabs/react-async-effect'
import { FlexCol } from '@xylabs/react-flexbox'
import { ArchivistConfig, ArchivistModule } from '@xyo-network/archivist'
import { ModuleWrapper } from '@xyo-network/module'
import { ModuleCardContent, ModuleRenderProps } from '@xyo-network/react-module'
import React, { useState } from 'react'

import { ArchivistParent } from './components'

export const ArchivistCardContent: React.FC<ModuleRenderProps<ArchivistModule> & CardContentProps> = ({ children, module, ...props }) => {
  const [config, setConfig] = useState<ArchivistConfig>()
  const [parentArchivistCollapse, setParentArchivistCollapse] = useState(false)

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async (mounted) => {
      const wrapper = module ? ModuleWrapper.wrap(module) : undefined
      const payloads = await wrapper?.discover()
      console.log(`Payloads: ${JSON.stringify(payloads, null, 2)}`)
      if (mounted()) {
        setConfig(payloads?.[0] as ArchivistConfig)
      }
    },
    [module],
  )

  const { commit, read, write } = config?.parents ?? {}

  return (
    <ModuleCardContent module={module} {...props}>
      {commit || read || write ? (
        <FlexCol alignItems="start">
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
      ) : null}
      {children}
    </ModuleCardContent>
  )
}
