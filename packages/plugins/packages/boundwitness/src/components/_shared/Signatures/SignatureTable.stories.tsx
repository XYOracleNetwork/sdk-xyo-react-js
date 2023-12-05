import { Meta, StoryFn } from '@storybook/react'
import { sampleBlock, sampleBlockWithPayloads } from '@xyo-network/react-storybook'
import { BrowserRouter } from 'react-router-dom'

import { BoundWitnessSignatureTable } from './SignatureTable'

const StorybookEntry = {
  argTypes: {},
  component: BoundWitnessSignatureTable,
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'boundwitness/SignatureTable',
} as Meta<typeof BoundWitnessSignatureTable>

const Template: StoryFn<typeof BoundWitnessSignatureTable> = (args) => (
  <BrowserRouter>
    <BoundWitnessSignatureTable {...args}></BoundWitnessSignatureTable>
  </BrowserRouter>
)

const Default = Template.bind({})
Default.args = {}

const WithData = Template.bind({})
WithData.args = { block: sampleBlock }

const WithDataAndPayloads = Template.bind({})
WithDataAndPayloads.args = { block: sampleBlockWithPayloads }

export { Default, WithData, WithDataAndPayloads }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry
