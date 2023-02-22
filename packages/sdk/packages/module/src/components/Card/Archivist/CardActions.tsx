import { CardActionsProps } from '@mui/material'
import { ArchivistModule } from '@xyo-network/archivist'

import { ModuleRenderProps } from '../../../ModuleRenderProps'
import { ModuleCardActions } from '../Module'

export const ArchivistCardActions: React.FC<ModuleRenderProps<ArchivistModule> & CardActionsProps> = (props) => {
  return <ModuleCardActions {...props} />
}
