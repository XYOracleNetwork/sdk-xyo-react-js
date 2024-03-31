import { CardActionsProps } from '@mui/material'
import { DivinerInstance } from '@xyo-network/diviner-model'

import { ModuleRenderProps } from '../../../ModuleRenderProps'
import { ModuleCardActions } from '../Module'

export const DivinerCardActions: React.FC<ModuleRenderProps<DivinerInstance> & CardActionsProps> = (props) => {
  return <ModuleCardActions {...props} />
}
