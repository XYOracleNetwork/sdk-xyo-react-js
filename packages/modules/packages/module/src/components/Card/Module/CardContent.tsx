import { CardContent, CardContentProps } from '@mui/material'
import React from 'react'

import { ModuleRenderProps } from '../../../ModuleRenderProps.tsx'

export const ModuleCardContent: React.FC<ModuleRenderProps & CardContentProps> = ({ children, ...props }) => {
  return <CardContent {...props}>{children}</CardContent>
}
