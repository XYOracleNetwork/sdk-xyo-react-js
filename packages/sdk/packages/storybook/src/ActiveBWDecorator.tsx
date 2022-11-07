import { DecoratorFn } from '@storybook/react'
import { ActiveBoundWitnessProvider } from '@xyo-network/react-address-history'

import { sampleAddressHistory } from './sampleAddressHistory'

export const ActiveBWDecorator: DecoratorFn = (Story, args) => {
  return (
    <ActiveBoundWitnessProvider activeBoundWitness={sampleAddressHistory[0]}>
      <Story {...args} />
    </ActiveBoundWitnessProvider>
  )
}
