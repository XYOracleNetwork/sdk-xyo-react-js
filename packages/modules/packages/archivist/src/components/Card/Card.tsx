import type { CardProps } from '@mui/material'
import { Card } from '@mui/material'
import type { ArchivistInstance } from '@xyo-network/archivist-model'
import type { ModuleRenderProps } from '@xyo-network/react-module'
import { ModuleCardActions } from '@xyo-network/react-module'
import React from 'react'

import { ArchivistCardContent } from './CardContent.tsx'
import { ArchivistCardHeader } from './CardHeader.tsx'

export const ArchivistCard: React.FC<CardProps & ModuleRenderProps<ArchivistInstance>> = ({
  children, mod, ...props
}) => {
  return (
    <Card {...props}>
      <ArchivistCardHeader mod={mod} />
      <ArchivistCardContent mod={mod} />
      {children}
      <ModuleCardActions mod={mod} />
    </Card>
  )
}
