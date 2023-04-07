import { Decorator } from '@storybook/react'

import { NestedBoundWitnessesProvider } from '../../providers'

export const WithNestedBoundWitnessesDecorator: Decorator = (Story, args) => (
  <NestedBoundWitnessesProvider>
    <Story {...args} />
  </NestedBoundWitnessesProvider>
)
