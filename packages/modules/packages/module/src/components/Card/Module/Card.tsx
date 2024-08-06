import { Card, CardProps } from '@mui/material'
import React from 'react'

import { ModuleRenderProps } from '../../../ModuleRenderProps.tsx'
import { ModuleCardActions } from './CardActions.tsx'
import { ModuleCardContent } from './CardContent.tsx'
import { ModuleCardHeader } from './CardHeader.tsx'

export const ModuleCard: React.FC<CardProps & ModuleRenderProps> = ({ mod, ...props }) => {
  return (
    <Card {...props}>
      <ModuleCardHeader mod={mod} />
      <ModuleCardContent mod={mod} />
      <ModuleCardActions mod={mod} />
    </Card>
  )
}
