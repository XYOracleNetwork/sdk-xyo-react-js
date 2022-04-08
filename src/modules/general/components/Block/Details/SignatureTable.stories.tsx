import { ComponentMeta, ComponentStory } from '@storybook/react'
import { BrowserRouter } from 'react-router-dom'

import { appThemeDecorator, sampleBlock, sampleBlockWithPayloads } from '../../.storybook'
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
  <BrowserRouter>
    <BlockSignatureTable {...args}></BlockSignatureTable>
  </BrowserRouter>
)

const Default = Template.bind({})
Default.args = {}
Default.decorators = [appThemeDecorator]

const WithData = Template.bind({})
WithData.args = { block: sampleBlock }
WithData.decorators = [appThemeDecorator]

const WithDataAndPayloads = Template.bind({})
WithDataAndPayloads.args = { block: sampleBlockWithPayloads }
WithDataAndPayloads.decorators = [appThemeDecorator]

export { Default, WithData, WithDataAndPayloads }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry
