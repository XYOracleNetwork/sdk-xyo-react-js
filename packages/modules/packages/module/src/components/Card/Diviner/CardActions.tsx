import { CardActionsProps } from '@mui/material'
import { DivinerModule } from '@xyo-network/diviner'

import { ModuleRenderProps } from '../../../ModuleRenderProps'
import { ModuleCardActions } from '../Module'

export const DivinerCardActions: React.FC<ModuleRenderProps<DivinerModule> & CardActionsProps> = (props) => {
  return <ModuleCardActions {...props} />
}
