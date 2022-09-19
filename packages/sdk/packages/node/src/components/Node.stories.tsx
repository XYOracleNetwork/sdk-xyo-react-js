import { ComponentMeta, ComponentStory } from '@storybook/react'
import {} from '@xyo-network/node'

import { NodeProvider } from '../contexts'
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
    <NodeProvider>
      <NodeBox {...args}></NodeBox>
    </NodeProvider>
  )
}

const Default = Template.bind({})
Default.args = {}

export { Default }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry
