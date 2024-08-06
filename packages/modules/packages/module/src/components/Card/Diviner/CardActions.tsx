import { CardActionsProps } from '@mui/material'
import { DivinerInstance } from '@xyo-network/diviner-model'
import React from 'react'

import { ModuleRenderProps } from '../../../ModuleRenderProps.tsx'
import { ModuleCardActions } from '../Module/index.ts'

export const DivinerCardActions: React.FC<ModuleRenderProps<DivinerInstance> & CardActionsProps> = (props) => {
  return <ModuleCardActions {...props} />
}
