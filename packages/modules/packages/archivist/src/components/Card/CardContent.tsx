import { CardContentProps, Typography } from '@mui/material'
import { EthAddress } from '@xylabs/eth-address'
import { EthAccountBox } from '@xylabs/react-crypto'
import { useAsyncEffect } from '@xylabs/react-shared'
import { ArchivistConfig, ArchivistModule } from '@xyo-network/archivist'
import { ModuleWrapper } from '@xyo-network/module'
import { ModuleCardContent, ModuleRenderProps } from '@xyo-network/react-module'
import { useState } from 'react'

export const ArchivistCardContent: React.FC<ModuleRenderProps<ArchivistModule> & CardContentProps> = ({ children, module, ...props }) => {
  const [config, setConfig] = useState<ArchivistConfig>()

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
