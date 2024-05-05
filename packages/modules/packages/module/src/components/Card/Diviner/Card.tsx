import { Card, CardProps } from '@mui/material'
import { DivinerInstance } from '@xyo-network/diviner-model'

import { ModuleRenderProps } from '../../../ModuleRenderProps'
import { ModuleCardActions } from '../Module'
import { DivinerCardContent } from './CardContent'
import { DivinerCardHeader } from './CardHeader'

export const DivinerCard: React.FC<CardProps & ModuleRenderProps<DivinerInstance>> = ({ children, mod, ...props }) => {
  return (
    <Card {...props}>
      <DivinerCardHeader mod={mod} />
      <DivinerCardContent mod={mod} />
      {children}
      <ModuleCardActions mod={mod} />
    </Card>
  )
}
