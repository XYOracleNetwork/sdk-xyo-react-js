import { CardActionsProps } from '@mui/material'
import { ArchivistInstance } from '@xyo-network/archivist-model'
import { ModuleCardActions, ModuleRenderProps } from '@xyo-network/react-module'
import React from 'react'

export const ArchivistCardActions: React.FC<ModuleRenderProps<ArchivistInstance> & CardActionsProps> = (props) => {
  return <ModuleCardActions {...props} />
}
