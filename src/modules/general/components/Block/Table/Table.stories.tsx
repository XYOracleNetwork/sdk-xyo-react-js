import { ComponentMeta, ComponentStory } from '@storybook/react'
import { BrowserRouter } from 'react-router-dom'

import { sampleBlock } from '../../../../.storybook'
import { BlockTable } from './Table'

const StorybookEntry = {
  argTypes: {},
  component: BlockTable,
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'Block/Table',
} as ComponentMeta<typeof BlockTable>

const Template: ComponentStory<typeof BlockTable> = (args) => (
  <BrowserRouter>
    <BlockTable {...args}></BlockTable>
  </BrowserRouter>
)

const Default = Template.bind({})
Default.args = {}

const WithData = Template.bind({})
WithData.args = { blocks: [sampleBlock, sampleBlock] }

const WithError = Template.bind({})
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { _hash, ...badBlock } = sampleBlock

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
WithError.args = { blocks: [sampleBlock, badBlock] }

export { Default, WithData, WithError }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry
