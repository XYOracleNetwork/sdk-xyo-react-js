import type { CardActionsProps } from '@mui/material'
import type { ArchivistInstance } from '@xyo-network/archivist-model'
import type { ModuleRenderProps } from '@xyo-network/react-module'
import { ModuleCardActions } from '@xyo-network/react-module'
import React from 'react'

export const ArchivistCardActions: React.FC<ModuleRenderProps<ArchivistInstance> & CardActionsProps> = (props) => {
  return <ModuleCardActions {...props} />
}
