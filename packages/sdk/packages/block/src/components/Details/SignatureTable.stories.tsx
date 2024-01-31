/* eslint-disable import/no-deprecated */
import { Meta, StoryFn } from '@storybook/react'
import { DeprecateStory, sampleBlock } from '@xyo-network/react-storybook'
import { BrowserRouter } from 'react-router-dom'

import { BlockSignatureTable } from './SignatureTable'

const StorybookEntry = {
  argTypes: {},
  component: BlockSignatureTable,
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'block/SignatureTable',
} as Meta<typeof BlockSignatureTable>

const Template: StoryFn<typeof BlockSignatureTable> = (args) => (
  <BrowserRouter>
    <DeprecateStory />
    <BlockSignatureTable {...args}></BlockSignatureTable>
  </BrowserRouter>
)

const Default = Template.bind({})
Default.args = {}

const WithData = Template.bind({})
WithData.args = { block: sampleBlock }

export { Default, WithData }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry
