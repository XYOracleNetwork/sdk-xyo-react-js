import type { Decorator } from '@storybook/react'
import type { Hash } from '@xylabs/hex'
import type { BoundWitness } from '@xyo-network/boundwitness-model'
import { usePayloadHash } from '@xyo-network/react-shared'
import { sampleAddressHistory } from '@xyo-network/react-storybook'
import React, { useState } from 'react'

import { ActiveBoundWitnessContext } from '../../contexts/index.ts'

export const ActiveBWDecorator: Decorator = (Story, args) => {
  const [activeBoundWitness, setActiveBoundWitness] = useState<BoundWitness | undefined>()
  const [activeBoundWitnessHash, setActiveBoundWitnessHash] = useState<Hash | undefined>()
  return (
    <ActiveBoundWitnessContext
      // eslint-disable-next-line @eslint-react/no-unstable-context-value
      value={{
        activeBoundWitness, activeBoundWitnessHash, provided: true, setActiveBoundWitness, setActiveBoundWitnessHash,
      }}
    >
      <Story {...args} />
    </ActiveBoundWitnessContext>
  )
}

export const ActiveBWDecoratorWithDefaultValues: Decorator = (Story, args) => {
  const [activeBoundWitness, setActiveBoundWitness] = useState<BoundWitness | undefined>(sampleAddressHistory[0])
  const activeBoundWitnessHash = usePayloadHash(activeBoundWitness)
  return (
    // eslint-disable-next-line @eslint-react/no-unstable-context-value
    <ActiveBoundWitnessContext value={{
      activeBoundWitness, activeBoundWitnessHash, provided: true, setActiveBoundWitness,
    }}
    >
      <Story {...args} />
    </ActiveBoundWitnessContext>
  )
}
