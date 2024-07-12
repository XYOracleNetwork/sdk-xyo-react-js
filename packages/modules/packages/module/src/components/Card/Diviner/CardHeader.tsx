import { CardHeaderProps } from '@mui/material'
import { DivinerInstance } from '@xyo-network/diviner-model'

import { ModuleRenderProps } from '../../../ModuleRenderProps.js'
import { ModuleCardHeader } from '../Module/index.js'

export const DivinerCardHeader: React.FC<ModuleRenderProps<DivinerInstance> & CardHeaderProps> = ({ title, mod, ...props }) => {
  return <ModuleCardHeader mod={mod} title={title ?? mod?.config.name ?? 'Diviner'} {...props} />
}
