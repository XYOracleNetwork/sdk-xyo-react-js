import { ComponentMeta, ComponentStory } from '@storybook/react'

import { sampleBlockWithPreviousHash } from '../../.storybook'
import { Value } from './Value'

const StorybookEntry = {
  argTypes: {},
  component: Value,
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'Properties/Value',
} as ComponentMeta<typeof Value>

const Template: ComponentStory<typeof Value> = (args) => <Value {...args}></Value>

const Default = Template.bind({})
Default.args = {}

const WithData = Template.bind({})

WithData.args = { value: sampleBlockWithPreviousHash._hash }

export { Default, WithData }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry
