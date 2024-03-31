import { CardHeaderProps } from '@mui/material'
import { DivinerInstance } from '@xyo-network/diviner-model'

import { ModuleRenderProps } from '../../../ModuleRenderProps'
import { ModuleCardHeader } from '../Module'

export const DivinerCardHeader: React.FC<ModuleRenderProps<DivinerInstance> & CardHeaderProps> = ({ title, module, ...props }) => {
  return <ModuleCardHeader module={module} title={title ?? module?.config.name ?? 'Diviner'} {...props} />
}
