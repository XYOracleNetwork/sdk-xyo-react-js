import { CardActionsProps } from '@mui/material'
import { AbstractArchivist } from '@xyo-network/archivist'

import { ModuleRenderProps } from '../../../ModuleRenderProps'
import { ModuleCardActions } from '../Module'

export const DivinerCardActions: React.FC<ModuleRenderProps<AbstractArchivist> & CardActionsProps> = (props) => {
  return <ModuleCardActions {...props} />
}
