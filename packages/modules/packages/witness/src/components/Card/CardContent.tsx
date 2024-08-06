import { CardContentProps } from '@mui/material'
import { FlexGrowRow } from '@xylabs/react-flexbox'
import { Payload } from '@xyo-network/payload-model'
import { ModuleCardContent, ModuleRenderProps } from '@xyo-network/react-module'
import { JsonViewerEx } from '@xyo-network/react-payload-raw-info'
import { WitnessInstance } from '@xyo-network/witness-model'
import React from 'react'

export type WitnessCardContentProps = ModuleRenderProps<WitnessInstance> &
  CardContentProps & {
    observation?: Payload[]
  }

export const WitnessCardContent: React.FC<WitnessCardContentProps> = ({ children, observation, mod, ...props }) => {
  return (
    <ModuleCardContent mod={mod} {...props}>
      <FlexGrowRow flexWrap="wrap" justifyContent="start" gap={2}>
        {observation
          ? <JsonViewerEx value={observation} />
          : null}
        {children}
      </FlexGrowRow>
    </ModuleCardContent>
  )
}
