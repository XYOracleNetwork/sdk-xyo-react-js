import { ComponentMeta, ComponentStory } from '@storybook/react'
import { sampleBlock, sampleBlockWithPayloads, useAppThemeDecorator } from '@xyo-network/react-storybook'
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
  title: 'block/SignatureTable',
} as ComponentMeta<typeof BoundWitnessSignatureTable>

const Template: ComponentStory<typeof BoundWitnessSignatureTable> = (args) => (
  <BrowserRouter>
    <BoundWitnessSignatureTable {...args}></BoundWitnessSignatureTable>
  </BrowserRouter>
)

const Default = Template.bind({})
Default.args = {}
Default.decorators = [useAppThemeDecorator]

const WithData = Template.bind({})
WithData.args = { block: sampleBlock }
WithData.decorators = [useAppThemeDecorator]

const WithDataAndPayloads = Template.bind({})
WithDataAndPayloads.args = { block: sampleBlockWithPayloads }
WithDataAndPayloads.decorators = [useAppThemeDecorator]

export { Default, WithData, WithDataAndPayloads }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry
