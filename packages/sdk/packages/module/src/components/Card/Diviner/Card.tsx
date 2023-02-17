import { Card, CardProps } from '@mui/material'
import { AbstractDiviner } from '@xyo-network/diviner'

import { ModuleRenderProps } from '../../../ModuleRenderProps'
import { ModuleCardActions } from '../Module'
import { DivinerCardContent } from './CardContent'
import { DivinerCardHeader } from './CardHeader'

export const DivinerCard: React.FC<CardProps & ModuleRenderProps<AbstractDiviner>> = ({ children, module, ...props }) => {
  return (
    <Card {...props}>
      <DivinerCardHeader module={module} />
      <DivinerCardContent module={module} />
      {children}
      <ModuleCardActions module={module} />
    </Card>
  )
}
