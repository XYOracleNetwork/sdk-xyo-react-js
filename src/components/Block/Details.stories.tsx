import { ComponentMeta, ComponentStory } from '@storybook/react'

import { sampleBlock } from '../.storybook'
import { BlockDetails } from './Details'

const StorybookEntry = {
  argTypes: {},
  component: BlockDetails,
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'Block/Details',
} as ComponentMeta<typeof BlockDetails>

const Template: ComponentStory<typeof BlockDetails> = (args) => <BlockDetails {...args}></BlockDetails>

const Default = Template.bind({})
Default.args = {}

const WithData = Template.bind({})

WithData.args = { block: sampleBlock }

export { Default, WithData }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry
