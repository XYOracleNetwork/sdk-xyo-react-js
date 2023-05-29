import { Meta, StoryFn } from '@storybook/react'
import { PayloadWrapper } from '@xyo-network/payload-wrapper'
import { sampleBlockWithPayloads } from '@xyo-network/react-storybook'

import { PropertyValue } from './Value'

const StorybookEntry = {
  argTypes: {},
  component: PropertyValue,
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'property/Value',
} as Meta<typeof PropertyValue>

const Template: StoryFn<typeof PropertyValue> = (args) => <PropertyValue {...args}></PropertyValue>

const Default = Template.bind({})
Default.args = {}

const WithData = Template.bind({})

WithData.args = { value: PayloadWrapper.hashSync(sampleBlockWithPayloads) }

export { Default, WithData }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry
