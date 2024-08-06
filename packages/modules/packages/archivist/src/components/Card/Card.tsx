import { Card, CardProps } from '@mui/material'
import { ArchivistInstance } from '@xyo-network/archivist-model'
import { ModuleCardActions, ModuleRenderProps } from '@xyo-network/react-module'
import React from 'react'

import { ArchivistCardContent } from './CardContent.js'
import { ArchivistCardHeader } from './CardHeader.js'

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
