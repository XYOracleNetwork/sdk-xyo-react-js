import { ComponentMeta, ComponentStory } from '@storybook/react'
import { XyoBoundWitnessBuilder } from '@xyo-network/sdk-xyo-client-js'

import { BlockTable } from './BlockTable'

const StorybookEntry = {
  argTypes: {},
  component: BlockTable,
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'BlockTable/Table',
} as ComponentMeta<typeof BlockTable>

const Template: ComponentStory<typeof BlockTable> = (args) => <BlockTable {...args}></BlockTable>

const Default = Template.bind({})
Default.args = {}

const WithData = Template.bind({})
const bw = new XyoBoundWitnessBuilder().payload({ schema: 'test.xyo.network' }).build()
WithData.args = { blocks: [bw] }

export { Default, WithData }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry
