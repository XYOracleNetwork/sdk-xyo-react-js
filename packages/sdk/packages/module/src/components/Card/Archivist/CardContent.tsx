import { CardContentProps, Typography } from '@mui/material'
import { EthAddress } from '@xylabs/eth-address'
import { EthAccountBox } from '@xylabs/react-crypto'
import { useAsyncEffect } from '@xylabs/react-shared'
import { ArchivistConfig, ArchivistModule } from '@xyo-network/archivist'
import { ModuleWrapper } from '@xyo-network/module'
import { useState } from 'react'

import { ModuleRenderProps } from '../../../ModuleRenderProps'
import { ModuleCardContent } from '../Module'

export const ArchivistCardContent: React.FC<ModuleRenderProps<ArchivistModule> & CardContentProps> = ({ children, module, ...props }) => {
  const [config, setConfig] = useState<ArchivistConfig>()

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async (mounted) => {
      const wrapper = module ? new ModuleWrapper(module) : undefined
      const payloads = await wrapper?.discover()
      console.log(`Payloads: ${JSON.stringify(payloads, null, 2)}`)
      if (mounted()) {
        setConfig(payloads?.[0])
      }
    },
    [module],
  )

  return (
    <ModuleCardContent module={module} {...props}>
      <Typography>Parents</Typography>
      {config?.parents?.commit?.map((address) => {
        return <EthAccountBox key={address} address={EthAddress.fromString(address)} />
      })}
      {children}
    </ModuleCardContent>
  )
}
