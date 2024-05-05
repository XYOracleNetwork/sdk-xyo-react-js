import { CardHeaderProps } from '@mui/material'
import { DivinerInstance } from '@xyo-network/diviner-model'

import { ModuleRenderProps } from '../../../ModuleRenderProps'
import { ModuleCardHeader } from '../Module'

export const DivinerCardHeader: React.FC<ModuleRenderProps<DivinerInstance> & CardHeaderProps> = ({ title, mod, ...props }) => {
  return <ModuleCardHeader mod={mod} title={title ?? mod?.config.name ?? 'Diviner'} {...props} />
}
