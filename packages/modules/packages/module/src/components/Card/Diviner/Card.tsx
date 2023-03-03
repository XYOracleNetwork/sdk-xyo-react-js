import { Card, CardProps } from '@mui/material'
import { DivinerModule } from '@xyo-network/diviner'

import { ModuleRenderProps } from '../../../ModuleRenderProps'
import { ModuleCardActions } from '../Module'
import { DivinerCardContent } from './CardContent'
import { DivinerCardHeader } from './CardHeader'

export const DivinerCard: React.FC<CardProps & ModuleRenderProps<DivinerModule>> = ({ children, module, ...props }) => {
  return (
    <Card {...props}>
      <DivinerCardHeader module={module} />
      <DivinerCardContent module={module} />
      {children}
      <ModuleCardActions module={module} />
    </Card>
  )
}
