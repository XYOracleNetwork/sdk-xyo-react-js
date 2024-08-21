import type { CardContentProps } from '@mui/material'
import { CardContent } from '@mui/material'
import React from 'react'

import type { ModuleRenderProps } from '../../../ModuleRenderProps.tsx'

export const ModuleCardContent: React.FC<ModuleRenderProps & CardContentProps> = ({
  children, ...props
}) => {
  return <CardContent {...props}>{children}</CardContent>
}
