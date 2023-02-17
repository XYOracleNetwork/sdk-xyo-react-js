import { Card, CardProps } from '@mui/material'
import { AbstractArchivist } from '@xyo-network/archivist'

import { ModuleRenderProps } from '../../../ModuleRenderProps'
import { ModuleCardActions } from '../Module'
import { ArchivistCardContent } from './CardContent'
import { ArchivistCardHeader } from './CardHeader'

export const ArchivistCard: React.FC<CardProps & ModuleRenderProps<AbstractArchivist>> = ({ children, module, ...props }) => {
  return (
    <Card {...props}>
      <ArchivistCardHeader module={module} />
      <ArchivistCardContent module={module} />
      {children}
      <ModuleCardActions module={module} />
    </Card>
  )
}
