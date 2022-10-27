import { CardHeader, CardHeaderProps } from '@mui/material'
import { Identicon } from '@xylabs/react-identicon'
import { XyoModuleWrapper } from '@xyo-network/module'

import { ModuleRenderProps } from '../ModuleRenderProps'

export const ModuleCardHeader: React.FC<ModuleRenderProps & CardHeaderProps> = ({ module, ...props }) => {
  const wrapper = module ? new XyoModuleWrapper(module) : undefined
  return <CardHeader title="XyoPayload" subheader={wrapper?.address} avatar={<Identicon size={24} value={wrapper?.address} />} {...props} />
}
