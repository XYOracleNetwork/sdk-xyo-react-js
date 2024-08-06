import { CardHeaderProps } from '@mui/material'
import { ModuleCardHeader, ModuleRenderProps } from '@xyo-network/react-module'
import { WitnessInstance } from '@xyo-network/witness-model'
import React from 'react'

export const WitnessCardHeader: React.FC<ModuleRenderProps<WitnessInstance> & CardHeaderProps> = ({ title, mod, ...props }) => {
  return <ModuleCardHeader mod={mod} title={title ?? mod?.config.name ?? 'Witness'} {...props} />
}
