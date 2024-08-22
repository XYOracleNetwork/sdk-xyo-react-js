import type { CardContentProps } from '@mui/material'
import type { DivinerInstance } from '@xyo-network/diviner-model'
import React from 'react'

import type { ModuleRenderProps } from '../../../ModuleRenderProps.tsx'
import { ModuleCardContent } from '../Module/index.ts'

export const DivinerCardContent: React.FC<ModuleRenderProps<DivinerInstance> & CardContentProps> = ({ children, ...props }) => {
  return <ModuleCardContent {...props}>{children}</ModuleCardContent>
}
