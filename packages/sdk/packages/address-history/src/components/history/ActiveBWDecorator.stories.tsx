import { DecoratorFn } from '@storybook/react'
import { sampleAddressHistory } from '@xyo-network/react-storybook'

import { ActiveBoundWitnessProvider } from '../../contexts'

export const ActiveBWDecorator: DecoratorFn = (Story, args) => {
  return (
    <ActiveBoundWitnessProvider activeBoundWitness={sampleAddressHistory[0]}>
      <Story {...args} />
    </ActiveBoundWitnessProvider>
  )
}
