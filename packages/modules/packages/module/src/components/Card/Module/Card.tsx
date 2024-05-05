import { Card, CardProps } from '@mui/material'

import { ModuleRenderProps } from '../../../ModuleRenderProps'
import { ModuleCardActions } from './CardActions'
import { ModuleCardContent } from './CardContent'
import { ModuleCardHeader } from './CardHeader'

export const ModuleCard: React.FC<CardProps & ModuleRenderProps> = ({ mod, ...props }) => {
  return (
    <Card {...props}>
      <ModuleCardHeader mod={mod} />
      <ModuleCardContent mod={mod} />
      <ModuleCardActions mod={mod} />
    </Card>
  )
}
