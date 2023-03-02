import { CardActionsProps } from '@mui/material'
import { ArchivistModule } from '@xyo-network/archivist'
import { ModuleCardActions, ModuleRenderProps } from '@xyo-network/react-module'

export const ArchivistCardActions: React.FC<ModuleRenderProps<ArchivistModule> & CardActionsProps> = (props) => {
  return <ModuleCardActions {...props} />
}
