import { ComponentMeta, ComponentStory } from '@storybook/react'
import { BrowserRouter } from 'react-router-dom'

import { sampleBlockWithPreviousHash } from '../../.storybook'
import { BlockDataDetails } from './DataDetails'

const StorybookEntry = {
  argTypes: {},
  component: BlockDataDetails,
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'Block/DataDetails',
} as ComponentMeta<typeof BlockDataDetails>

const Template: ComponentStory<typeof BlockDataDetails> = (args) => (
  <BrowserRouter>
    <BlockDataDetails {...args}></BlockDataDetails>
  </BrowserRouter>
)

const Default = Template.bind({})
Default.args = {}

const WithData = Template.bind({})

WithData.args = { block: sampleBlockWithPreviousHash }

export { Default, WithData }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry
