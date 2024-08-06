import { CardContentProps } from '@mui/material'
import { useAsyncEffect } from '@xylabs/react-async-effect'
import { FlexGrowRow } from '@xylabs/react-flexbox'
import { ArchivistConfig, ArchivistInstance } from '@xyo-network/archivist-model'
import { ModuleWrapper } from '@xyo-network/module-wrapper'
import { ModuleCardContent, ModuleRenderProps } from '@xyo-network/react-module'
import { useWallet } from '@xyo-network/react-wallet'
import React, { useState } from 'react'

import { ArchivistParents } from './components/index.ts'

export const ArchivistCardContent: React.FC<ModuleRenderProps<ArchivistInstance> & CardContentProps> = ({ children, mod, ...props }) => {
  const [config, setConfig] = useState<ArchivistConfig>()
  const [wallet] = useWallet()

  useAsyncEffect(
    async (mounted) => {
      if (wallet && mod) {
        const wrapper = ModuleWrapper.wrap(mod, wallet)
        const payloads = await wrapper?.state()
        if (mounted()) {
          setConfig(payloads?.[0] as ArchivistConfig)
        }
      } else {
        setConfig(undefined)
      }
    },
    [mod, wallet],
  )

  return (
    <ModuleCardContent mod={mod} {...props}>
      <FlexGrowRow flexWrap="wrap" justifyContent="start" gap={2}>
        {children}
        <ArchivistParents config={config} />
      </FlexGrowRow>
    </ModuleCardContent>
  )
}
