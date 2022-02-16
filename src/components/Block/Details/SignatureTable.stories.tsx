import { ComponentMeta, ComponentStory } from '@storybook/react'

import { appThemeDecorator, sampleBlock, sampleBlockWithPreviousHash } from '../../.storybook'
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
Default.decorators = [appThemeDecorator]

const WithData = Template.bind({})
WithData.args = { block: sampleBlock }
WithData.decorators = [appThemeDecorator]

const WithDataAndPreviousHash = Template.bind({})
WithDataAndPreviousHash.args = { block: sampleBlockWithPreviousHash }
WithDataAndPreviousHash.decorators = [appThemeDecorator]

export { Default, WithData, WithDataAndPreviousHash }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry
