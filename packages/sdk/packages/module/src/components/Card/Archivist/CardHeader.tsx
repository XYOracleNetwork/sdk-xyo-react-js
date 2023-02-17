import { CardHeaderProps } from '@mui/material'
import { AbstractArchivist } from '@xyo-network/archivist'

import { ModuleRenderProps } from '../../../ModuleRenderProps'
import { ModuleCardHeader } from '../Module'

export const ArchivistCardHeader: React.FC<ModuleRenderProps<AbstractArchivist> & CardHeaderProps> = ({ title, module, ...props }) => {
  return <ModuleCardHeader module={module} title={title ?? 'Archivist'} {...props} />
}
