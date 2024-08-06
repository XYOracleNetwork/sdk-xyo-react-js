import { CardActionsProps } from '@mui/material'
import { DivinerInstance } from '@xyo-network/diviner-model'
import React from 'react'

import { ModuleRenderProps } from '../../../ModuleRenderProps.js'
import { ModuleCardActions } from '../Module/index.js'

export const DivinerCardActions: React.FC<ModuleRenderProps<DivinerInstance> & CardActionsProps> = (props) => {
  return <ModuleCardActions {...props} />
}
