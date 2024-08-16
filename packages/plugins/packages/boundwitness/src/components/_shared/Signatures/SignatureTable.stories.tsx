import type { Meta, StoryFn } from '@storybook/react'
import { sampleBlock } from '@xyo-network/react-storybook'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import { BoundWitnessSignatureTable } from './SignatureTable.tsx'

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
