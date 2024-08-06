import { CardHeaderProps } from '@mui/material'
import { DivinerInstance } from '@xyo-network/diviner-model'
import React from 'react'

import { ModuleRenderProps } from '../../../ModuleRenderProps.tsx'
import { ModuleCardHeader } from '../Module/index.ts'

export const DivinerCardHeader: React.FC<ModuleRenderProps<DivinerInstance> & CardHeaderProps> = ({ title, mod, ...props }) => {
  return <ModuleCardHeader mod={mod} title={title ?? mod?.config.name ?? 'Diviner'} {...props} />
}
