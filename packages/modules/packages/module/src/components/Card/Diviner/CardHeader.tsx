import { CardHeaderProps } from '@mui/material'
import { DivinerModule } from '@xyo-network/diviner'

import { ModuleRenderProps } from '../../../ModuleRenderProps'
import { ModuleCardHeader } from '../Module'

export const DivinerCardHeader: React.FC<ModuleRenderProps<DivinerModule> & CardHeaderProps> = ({ title, module, ...props }) => {
  return <ModuleCardHeader module={module} title={title ?? module?.config.name ?? 'Diviner'} {...props} />
}
