import { CardActionsProps } from '@mui/material'
import { ArchivistInstance } from '@xyo-network/archivist'
import { ModuleCardActions, ModuleRenderProps } from '@xyo-network/react-module'

export const ArchivistCardActions: React.FC<ModuleRenderProps<ArchivistInstance> & CardActionsProps> = (props) => {
  return <ModuleCardActions {...props} />
}
