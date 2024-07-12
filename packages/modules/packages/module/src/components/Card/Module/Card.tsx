import { Card, CardProps } from '@mui/material'

import { ModuleRenderProps } from '../../../ModuleRenderProps.js'
import { ModuleCardActions } from './CardActions.js'
import { ModuleCardContent } from './CardContent.js'
import { ModuleCardHeader } from './CardHeader.js'

export const ModuleCard: React.FC<CardProps & ModuleRenderProps> = ({ mod, ...props }) => {
  return (
    <Card {...props}>
      <ModuleCardHeader mod={mod} />
      <ModuleCardContent mod={mod} />
      <ModuleCardActions mod={mod} />
    </Card>
  )
}
