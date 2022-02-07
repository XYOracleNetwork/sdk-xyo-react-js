import { ComponentMeta, ComponentStory } from '@storybook/react'

import { sampleBlock } from '../.storybook'
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

const Template: ComponentStory<typeof BlockTable> = (args) => <BlockTable {...args}></BlockTable>

const Default = Template.bind({})
Default.args = {}

const WithData = Template.bind({})

WithData.args = { blocks: [sampleBlock] }

export { Default, WithData }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry
