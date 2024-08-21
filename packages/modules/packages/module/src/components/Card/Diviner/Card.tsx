import type { CardProps } from '@mui/material'
import { Card } from '@mui/material'
import type { DivinerInstance } from '@xyo-network/diviner-model'
import React from 'react'

import type { ModuleRenderProps } from '../../../ModuleRenderProps.tsx'
import { ModuleCardActions } from '../Module/index.ts'
import { DivinerCardContent } from './CardContent.tsx'
import { DivinerCardHeader } from './CardHeader.tsx'

export const DivinerCard: React.FC<CardProps & ModuleRenderProps<DivinerInstance>> = ({
  children, mod, ...props
}) => {
  return (
    <Card {...props}>
      <DivinerCardHeader mod={mod} />
      <DivinerCardContent mod={mod} />
      {children}
      <ModuleCardActions mod={mod} />
    </Card>
  )
}
