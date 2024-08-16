import type { CardActionsProps } from '@mui/material'
import type { DivinerInstance } from '@xyo-network/diviner-model'
import React from 'react'

import type { ModuleRenderProps } from '../../../ModuleRenderProps.tsx'
import { ModuleCardActions } from '../Module/index.ts'

export const DivinerCardActions: React.FC<ModuleRenderProps<DivinerInstance> & CardActionsProps> = (props) => {
  return <ModuleCardActions {...props} />
}
