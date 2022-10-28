import { Card, CardProps } from '@mui/material'
import { PayloadArchivist } from '@xyo-network/archivist'

import { ModuleRenderProps } from '../ModuleRenderProps'
import { ArchivistCardHeader } from './ArchivistCardHeader'
import { ArchivistCardContent } from './ArchivistContent'
import { ModuleCardActions } from './CardActions'

export const ArchivistCard: React.FC<CardProps & ModuleRenderProps<PayloadArchivist>> = ({ module, ...props }) => {
  return (
    <Card {...props}>
      <ArchivistCardHeader module={module} />
      <ArchivistCardContent module={module} />
      <ModuleCardActions module={module} />
    </Card>
  )
}
