import { Meta, StoryFn } from '@storybook/react'

import { PropertyValue } from './Value.js'

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

WithData.args = {
  // value: await PayloadBuilder.dataHash(sampleBlock)
}

export { Default, WithData }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry
