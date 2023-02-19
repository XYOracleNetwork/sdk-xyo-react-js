import { CardHeaderProps } from '@mui/material'
import { AbstractDiviner } from '@xyo-network/diviner'

import { ModuleRenderProps } from '../../../ModuleRenderProps'
import { ModuleCardHeader } from '../Module'

export const DivinerCardHeader: React.FC<ModuleRenderProps<AbstractDiviner> & CardHeaderProps> = ({ title, module, ...props }) => {
  return <ModuleCardHeader module={module} title={title ?? 'Archivist'} {...props} />
}
