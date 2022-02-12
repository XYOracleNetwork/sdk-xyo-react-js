import { ComponentMeta, ComponentStory } from '@storybook/react'

import { sampleBlock, sampleBlockWithPreviousHash } from '../../../.storybook'
import { BlockSignatureTable } from './SignatureTable'

const StorybookEntry = {
  argTypes: {},
  component: BlockSignatureTable,
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'Block/SignatureTable',
} as ComponentMeta<typeof BlockSignatureTable>

const Template: ComponentStory<typeof BlockSignatureTable> = (args) => (
  <BlockSignatureTable {...args}></BlockSignatureTable>
)

const Default = Template.bind({})
Default.args = {}

const WithData = Template.bind({})
WithData.args = { block: sampleBlock }

const WithDataAndPreviousHash = Template.bind({})
WithDataAndPreviousHash.args = { block: sampleBlockWithPreviousHash }

export { Default, WithData, WithDataAndPreviousHash }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry
