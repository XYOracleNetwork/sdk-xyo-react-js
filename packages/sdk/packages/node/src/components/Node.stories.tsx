import { ComponentMeta, ComponentStory } from '@storybook/react'
import { NodeConfigSchema } from '@xyo-network/node'

import { MemoryNodeProvider } from '../contexts'
import { NodeBox } from './Node'

const StorybookEntry = {
  argTypes: {
    responsive: {
      defaultValue: false,
    },
  },
  component: NodeBox,
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'node/NodeBox',
} as ComponentMeta<typeof NodeBox>

const Template: ComponentStory<typeof NodeBox> = (args) => {
  return (
    <MemoryNodeProvider config={{ schema: NodeConfigSchema }}>
      <NodeBox {...args}></NodeBox>
    </MemoryNodeProvider>
  )
}

const Default = Template.bind({})
Default.args = {}

export { Default }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry
