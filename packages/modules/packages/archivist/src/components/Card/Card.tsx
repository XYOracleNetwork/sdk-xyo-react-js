import { Card, CardProps } from '@mui/material'
import { ArchivistInstance } from '@xyo-network/archivist-model'
import { ModuleCardActions, ModuleRenderProps } from '@xyo-network/react-module'

import { ArchivistCardContent } from './CardContent'
import { ArchivistCardHeader } from './CardHeader'

export const ArchivistCard: React.FC<CardProps & ModuleRenderProps<ArchivistInstance>> = ({ children, mod, ...props }) => {
  return (
    <Card {...props}>
      <ArchivistCardHeader mod={mod} />
      <ArchivistCardContent mod={mod} />
      {children}
      <ModuleCardActions mod={mod} />
    </Card>
  )
}
