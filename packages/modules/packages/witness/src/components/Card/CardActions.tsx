import type { CardActionsProps } from '@mui/material'
import { ButtonEx } from '@xylabs/react-button'
import type { ModuleRenderProps } from '@xyo-network/react-module'
import { ModuleCardActions } from '@xyo-network/react-module'
import type { WitnessInstance } from '@xyo-network/witness-model'
import React from 'react'

export type WitnessCardActionsProps = ModuleRenderProps<WitnessInstance> &
  CardActionsProps & {
    onObserve?: (mod?: WitnessInstance) => void
  }

export const WitnessCardActions: React.FC<WitnessCardActionsProps> = ({
  onObserve, mod, ...props
}) => {
  return (
    <ModuleCardActions mod={mod} {...props}>
      <ButtonEx onClick={() => onObserve?.(mod)} size="small" variant="outlined">
        Observe
      </ButtonEx>
    </ModuleCardActions>
  )
}
