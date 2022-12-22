import { ComponentStory, DecoratorFn, Meta } from '@storybook/react'
import { NodeConfigSchema } from '@xyo-network/node'

import { MemoryNodeProvider, useAddNamedModules, useNode } from '../contexts'
import { NodeBox } from './Node'

const NodeBoxDecorator: DecoratorFn = (Story, args) => {
  return (
    <MemoryNodeProvider config={{ schema: NodeConfigSchema }}>
      <Story {...args} />
    </MemoryNodeProvider>
  )
}

// eslint-disable-next-line import/no-default-export
export default {
  component: NodeBox,
  decorators: [NodeBoxDecorator],
  title: 'node/NodeBox',
} as Meta

const Template: ComponentStory<typeof NodeBox> = (props) => <NodeBox {...props} />
const TemplateWithModules: ComponentStory<typeof NodeBox> = (props) => {
  const list = { AddressHistoryDiviner: Symbol('AddressHistoryDiviner') }
  useAddNamedModules(list, { apiDomain: 'http://localhost:8080' })

  return <NodeBox {...props} />
}

const Default = Template.bind({})
Default.args = {}

const WithModules = TemplateWithModules.bind({})
WithModules.argTypes = {}

export { Default, WithModules }
