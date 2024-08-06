import { Meta, StoryFn } from '@storybook/react'
import { sampleBlock } from '@xyo-network/react-storybook'
import { BrowserRouter } from 'react-router-dom'

import { BoundWitnessSignatureTable } from './SignatureTable.js'

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

const Template: StoryFn<typeof BoundWitnessSignatureTable> = args => (
  <BrowserRouter>
    <BoundWitnessSignatureTable {...args}></BoundWitnessSignatureTable>
  </BrowserRouter>
)

const Default = Template.bind({})
Default.args = {}

const WithData = Template.bind({})
WithData.args = { block: sampleBlock }

export { Default, WithData }

export default StorybookEntry
