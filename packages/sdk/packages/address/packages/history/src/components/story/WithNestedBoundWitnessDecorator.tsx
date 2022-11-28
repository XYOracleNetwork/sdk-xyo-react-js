import { DecoratorFn } from '@storybook/react'

import { NestedBoundWitnessesProvider } from '../../contexts'

export const WithNestedBoundWitnessesDecorator: DecoratorFn = (Story, args) => (
  <NestedBoundWitnessesProvider>
    <Story {...args} />
  </NestedBoundWitnessesProvider>
)
