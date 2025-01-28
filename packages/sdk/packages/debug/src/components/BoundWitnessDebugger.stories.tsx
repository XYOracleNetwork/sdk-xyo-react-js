import type { Meta, StoryFn } from '@storybook/react'
import React from 'react'

import { BoundWitnessDebugger } from './BoundWitnessDebugger.tsx'

export default { title: 'debug/BoundWitness', component: BoundWitnessDebugger } as Meta

const Template: StoryFn<typeof BoundWitnessDebugger> = args => <BoundWitnessDebugger {...args} />

const Default = Template.bind({})
Default.args = {}

export { Default }
