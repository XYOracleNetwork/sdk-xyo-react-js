import { CardContentProps } from '@mui/material'
import { useAsyncEffect } from '@xylabs/react-async-effect'
import { FlexGrowRow } from '@xylabs/react-flexbox'
import { ArchivistConfig, ArchivistInstance } from '@xyo-network/archivist'
import { ModuleWrapper } from '@xyo-network/module-wrapper'
import { ModuleCardContent, ModuleRenderProps } from '@xyo-network/react-module'
import { useWallet } from '@xyo-network/react-wallet'
import React, { useState } from 'react'

import { ArchivistParents } from './components'

export const ArchivistCardContent: React.FC<ModuleRenderProps<ArchivistInstance> & CardContentProps> = ({ children, module, ...props }) => {
  const [config, setConfig] = useState<ArchivistConfig>()
  const [wallet] = useWallet()

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async (mounted) => {
      if (wallet && module) {
        const wrapper = ModuleWrapper.wrap(module, wallet)
        const payloads = await wrapper?.discover()
        if (mounted()) {
          setConfig(payloads?.[0] as ArchivistConfig)
        }
      } else {
        setConfig(undefined)
      }
    },
    [module, wallet],
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
