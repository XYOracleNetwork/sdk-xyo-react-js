import { Card, CardProps } from '@mui/material'

import { ModuleRenderProps } from '../ModuleRenderProps'
import { ModuleCardActionArea } from './CardActionArea'
import { ModuleCardContent } from './CardContent'
import { ModuleCardHeader } from './CardHeader'

export const ModuleCard: React.FC<CardProps & ModuleRenderProps> = ({ module, ...props }) => {
  return (
    <Card {...props}>
      <ModuleCardHeader module={module} />
      <ModuleCardContent module={module} />
      <ModuleCardActionArea module={module} />
    </Card>
  )
}
