import { Card, CardProps } from '@mui/material'

import { ModuleRenderProps } from '../../../ModuleRenderProps'
import { ModuleCardActions } from './CardActions'
import { ModuleCardContent } from './CardContent'
import { ModuleCardHeader } from './CardHeader'

export const ModuleCard: React.FC<CardProps & ModuleRenderProps> = ({ module, ...props }) => {
  return (
    <Card {...props}>
      <ModuleCardHeader module={module} />
      <ModuleCardContent module={module} />
      <ModuleCardActions module={module} />
    </Card>
  )
}
