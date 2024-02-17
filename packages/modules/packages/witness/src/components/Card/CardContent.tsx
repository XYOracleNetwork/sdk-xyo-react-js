import { CardContentProps } from '@mui/material'
import { FlexGrowRow } from '@xylabs/react-flexbox'
import { Payload } from '@xyo-network/payload-model'
import { ModuleCardContent, ModuleRenderProps } from '@xyo-network/react-module'
import { WitnessInstance } from '@xyo-network/witness-model'
import React from 'react'
import JsonView from 'react-json-view'

export type WitnessCardContentProps = ModuleRenderProps<WitnessInstance> &
  CardContentProps & {
    observation?: Payload[]
  }

export const WitnessCardContent: React.FC<WitnessCardContentProps> = ({ children, observation, module, ...props }) => {
  return (
    <ModuleCardContent module={module} {...props}>
      <FlexGrowRow flexWrap="wrap" justifyContent="start" gap={2}>
        {observation ?
          <JsonView src={observation} />
        : null}
        {children}
      </FlexGrowRow>
    </ModuleCardContent>
  )
}
