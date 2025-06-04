import type { Meta, StoryFn } from '@storybook/react-vite'
import React from 'react'

import { PayloadDebugger } from './PayloadDebugger.tsx'

export default { title: 'debug/payload', component: PayloadDebugger } as Meta

const Template: StoryFn<typeof PayloadDebugger> = args => <PayloadDebugger {...args} />

const Default = Template.bind({})
Default.args = {}

export { Default }
