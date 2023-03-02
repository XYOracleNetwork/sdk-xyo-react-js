import { Card, CardProps } from '@mui/material'
import { ArchivistModule } from '@xyo-network/archivist'
import { ModuleCardActions, ModuleRenderProps } from '@xyo-network/react-module'

import { ArchivistCardContent } from './CardContent'
import { ArchivistCardHeader } from './CardHeader'

export const ArchivistCard: React.FC<CardProps & ModuleRenderProps<ArchivistModule>> = ({ children, module, ...props }) => {
  return (
    <Card {...props}>
      <ArchivistCardHeader module={module} />
      <ArchivistCardContent module={module} />
      {children}
      <ModuleCardActions module={module} />
    </Card>
  )
}
