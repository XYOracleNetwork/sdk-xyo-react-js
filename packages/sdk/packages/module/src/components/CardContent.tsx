import { CardContent, CardContentProps, Typography } from '@mui/material'
import { EthAddress } from '@xylabs/sdk-js'
import { EthAccountBox } from '@xylabs/sdk-react'
import { XyoModuleWrapper } from '@xyo-network/module'

import { ModuleRenderProps } from '../ModuleRenderProps'

export const ModuleCardContent: React.FC<ModuleRenderProps & CardContentProps> = ({ module, ...props }) => {
  const wrapper = module ? new XyoModuleWrapper(module) : undefined

  const account = wrapper?.address ? EthAddress.fromString(wrapper?.address) : undefined

  return (
    <CardContent {...props}>
      <EthAccountBox address={account} />
      <Typography>Parents</Typography>
    </CardContent>
  )
}
