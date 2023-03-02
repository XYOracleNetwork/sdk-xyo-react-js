import { CardContent, CardContentProps, Typography } from '@mui/material'
import { EthAddress } from '@xylabs/eth-address'
import { EthAccountBox } from '@xylabs/react-crypto'
import { useAsyncEffect } from '@xylabs/react-shared'
import { ModuleConfig, ModuleWrapper } from '@xyo-network/module'
import { useState } from 'react'

import { ModuleRenderProps } from '../../../ModuleRenderProps'

export const ModuleCardContent: React.FC<ModuleRenderProps & CardContentProps> = ({ children, module, ...props }) => {
  const [config, setConfig] = useState<ModuleConfig>()

  const account = module?.address ? EthAddress.fromString(module?.address) : undefined

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
    <CardContent {...props}>
      <EthAccountBox address={account} />
      {children}
      <Typography variant="subtitle2">{config?.schema}</Typography>
    </CardContent>
  )
}
