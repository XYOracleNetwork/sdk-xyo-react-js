import type { Decorator } from '@storybook/react-vite'
import React from 'react'

import { NestedBoundWitnessesProvider } from '../../providers/index.ts'

export const WithNestedBoundWitnessesDecorator: Decorator = (Story, args) => (
  <NestedBoundWitnessesProvider>
    <Story {...args} />
  </NestedBoundWitnessesProvider>
)
