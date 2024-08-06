import { CardActionsProps } from '@mui/material'
import { ButtonEx } from '@xylabs/react-button'
import { ModuleCardActions, ModuleRenderProps } from '@xyo-network/react-module'
import { SentinelInstance } from '@xyo-network/sentinel-model'
import React from 'react'

export type SentinelCardActionsProps = ModuleRenderProps<SentinelInstance> &
  CardActionsProps & {
    onReport?: (mod?: SentinelInstance) => void
  }

export const SentinelCardActions: React.FC<SentinelCardActionsProps> = ({ onReport, mod, ...props }) => {
  return (
    <ModuleCardActions mod={mod} {...props}>
      <ButtonEx onClick={() => onReport?.(mod)} size="small" variant="outlined">
        Report
      </ButtonEx>
    </ModuleCardActions>
  )
}
