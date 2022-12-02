import { DecoratorFn } from '@storybook/react'

import { NestedBoundWitnessesProvider } from '../../providers'

export const WithNestedBoundWitnessesDecorator: DecoratorFn = (Story, args) => (
  <NestedBoundWitnessesProvider>
    <Story {...args} />
  </NestedBoundWitnessesProvider>
)
