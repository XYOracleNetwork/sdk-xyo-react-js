import { CardHeaderProps } from '@mui/material'
import { PayloadArchivist } from '@xyo-network/archivist'

import { ModuleRenderProps } from '../ModuleRenderProps'
import { ModuleCardHeader } from './CardHeader'

export const ArchivistCardHeader: React.FC<ModuleRenderProps<PayloadArchivist> & CardHeaderProps> = ({ title, module, ...props }) => {
  return <ModuleCardHeader module={module} title={title ?? 'Archivist'} {...props} />
}
