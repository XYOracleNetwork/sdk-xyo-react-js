import { DecoratorFn } from '@storybook/react'

import { ActiveBoundWitnessProvider } from '../../../contexts'
import { sampleAddressHistory } from './sampleAddressHistory.stories'

export const ActiveBWDecorator: DecoratorFn = (Story, args) => {
  return (
    <ActiveBoundWitnessProvider activeBoundWitness={sampleAddressHistory[0]}>
      <Story {...args} />
    </ActiveBoundWitnessProvider>
  )
}
