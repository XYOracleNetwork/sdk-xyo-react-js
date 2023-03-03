import { CardHeaderProps } from '@mui/material'
import { ArchivistModule } from '@xyo-network/archivist'
import { ModuleCardHeader, ModuleRenderProps } from '@xyo-network/react-module'

export const ArchivistCardHeader: React.FC<ModuleRenderProps<ArchivistModule> & CardHeaderProps> = ({ title, module, ...props }) => {
  return <ModuleCardHeader module={module} title={title ?? 'Archivist'} {...props} />
}
