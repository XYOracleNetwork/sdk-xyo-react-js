import { Card, CardProps } from '@mui/material'
import { DivinerInstance } from '@xyo-network/diviner-model'

import { ModuleRenderProps } from '../../../ModuleRenderProps.js'
import { ModuleCardActions } from '../Module/index.js'
import { DivinerCardContent } from './CardContent.js'
import { DivinerCardHeader } from './CardHeader.js'

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
