import { ComponentMeta, ComponentStory } from '@storybook/react'

import { sampleBlockWithPreviousHash } from '../../.storybook'
import { Property } from './Property'

const StorybookEntry = {
  argTypes: {},
  component: Property,
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'Properties/Property',
} as ComponentMeta<typeof Property>

const Template: ComponentStory<typeof Property> = (args) => <Property {...args}></Property>

const Default = Template.bind({})
Default.args = {}

const WithData = Template.bind({})

WithData.args = { title: 'Block Hash', value: sampleBlockWithPreviousHash._hash }

export { Default, WithData }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry
