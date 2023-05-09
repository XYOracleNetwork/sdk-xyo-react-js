import { CardContentProps } from '@mui/material'
import { useAsyncEffect } from '@xylabs/react-async-effect'
import { FlexGrowRow } from '@xylabs/react-flexbox'
import { ArchivistConfig, ArchivistModule } from '@xyo-network/archivist'
import { ModuleWrapper } from '@xyo-network/module'
import { ModuleCardContent, ModuleRenderProps } from '@xyo-network/react-module'
import React, { useState } from 'react'

import { ArchivistParents } from './components'

export const ArchivistCardContent: React.FC<ModuleRenderProps<ArchivistModule> & CardContentProps> = ({ children, module, ...props }) => {
  const [config, setConfig] = useState<ArchivistConfig>()

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async (mounted) => {
      const wrapper = module ? ModuleWrapper.wrap(module) : undefined
      const payloads = await wrapper?.discover()
      if (mounted()) {
        setConfig(payloads?.[0] as ArchivistConfig)
      }
    },
    [module],
  )

  return (
    <ModuleCardContent module={module} {...props}>
      <FlexGrowRow flexWrap="wrap" justifyContent="start" gap={2}>
        {children}
        <ArchivistParents config={config} />
      </FlexGrowRow>
    </ModuleCardContent>
  )
}
