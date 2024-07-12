import { Decorator } from '@storybook/react'

import { NestedBoundWitnessesProvider } from '../../providers/index.js'

export const WithNestedBoundWitnessesDecorator: Decorator = (Story, args) => (
  <NestedBoundWitnessesProvider>
    <Story {...args} />
  </NestedBoundWitnessesProvider>
)
