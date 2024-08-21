import type { CardHeaderProps } from '@mui/material'
import type { ModuleRenderProps } from '@xyo-network/react-module'
import { ModuleCardHeader } from '@xyo-network/react-module'
import type { SentinelInstance } from '@xyo-network/sentinel-model'
import React from 'react'

export const SentinelCardHeader: React.FC<ModuleRenderProps<SentinelInstance> & CardHeaderProps> = ({
  title, mod, ...props
}) => {
  return <ModuleCardHeader mod={mod} title={title ?? mod?.config.name ?? 'Sentinel'} {...props} />
}
