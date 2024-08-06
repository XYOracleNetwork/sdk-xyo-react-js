import { Decorator } from '@storybook/react'
import React from 'react'

import { NestedBoundWitnessesProvider } from '../../providers/index.js'

export const WithNestedBoundWitnessesDecorator: Decorator = (Story, args) => (
  <NestedBoundWitnessesProvider>
    <Story {...args} />
  </NestedBoundWitnessesProvider>
)
