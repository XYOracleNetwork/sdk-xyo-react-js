import { DecoratorFn } from '@storybook/react'
import { NestedBoundWitnessesProvider } from '@xyo-network/react-address-history'

export const WithNestedBoundWitnessesDecorator: DecoratorFn = (Story, args) => (
  <NestedBoundWitnessesProvider>
    <Story {...args} />
  </NestedBoundWitnessesProvider>
)
