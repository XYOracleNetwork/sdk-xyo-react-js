import type { Decorator } from '@storybook/react-vite'
import type { Hash } from '@xylabs/sdk-js'
import type { BoundWitness } from '@xyo-network/boundwitness-model'
import { usePayloadHash } from '@xyo-network/react-shared'
import { sampleAddressHistory } from '@xyo-network/react-storybook'
import React, { useMemo, useState } from 'react'

import type { ActiveBoundWitnessState } from '../../contexts/index.ts'
import { ActiveBoundWitnessContext } from '../../contexts/index.ts'

export const ActiveBWDecorator: Decorator = (Story, args) => {
  const [activeBoundWitness, setActiveBoundWitness] = useState<BoundWitness | undefined>()
  const [activeBoundWitnessHash, setActiveBoundWitnessHash] = useState<Hash | undefined>()

  const value = useMemo(() => {
    const values: ActiveBoundWitnessState = {
      activeBoundWitness, activeBoundWitnessHash, provided: true, setActiveBoundWitness, setActiveBoundWitnessHash,
    }
    return values
  }, [activeBoundWitness, activeBoundWitnessHash])
  return (
    <ActiveBoundWitnessContext
      value={value}
    >
      <Story {...args} />
    </ActiveBoundWitnessContext>
  )
}

export const ActiveBWDecoratorWithDefaultValues: Decorator = (Story, args) => {
  const [activeBoundWitness, setActiveBoundWitness] = useState<BoundWitness | undefined>(sampleAddressHistory[0])
  const activeBoundWitnessHash = usePayloadHash(activeBoundWitness)

  const value = useMemo(() => {
    const values: ActiveBoundWitnessState = {
      activeBoundWitness, activeBoundWitnessHash, provided: true, setActiveBoundWitness,
    }
    return values
  }, [activeBoundWitness, activeBoundWitnessHash])
  return (
    <ActiveBoundWitnessContext value={value}>
      <Story {...args} />
    </ActiveBoundWitnessContext>
  )
}
