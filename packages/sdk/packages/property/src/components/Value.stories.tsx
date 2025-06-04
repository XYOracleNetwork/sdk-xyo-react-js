import type { Meta, StoryFn } from '@storybook/react-vite'
import React from 'react'

import { PropertyValue } from './Value.tsx'

const StorybookEntry = {
  argTypes: {},
  component: PropertyValue,
  parameters: { docs: { page: null } },
  title: 'property/Value',
} as Meta<typeof PropertyValue>

const Template: StoryFn<typeof PropertyValue> = args => <PropertyValue {...args}></PropertyValue>

const Default = Template.bind({})
Default.args = {}

const WithData = Template.bind({})

WithData.args = {}

export { Default, WithData }

export default StorybookEntry
