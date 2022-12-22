import { ComponentStory, DecoratorFn } from '@storybook/react'
import { NodeConfigSchema } from '@xyo-network/node'

import { MemoryNodeProvider, useAddNamedModules } from '../contexts'
import { NodeQueryDiviner } from './NodeQueryDiviner'

const MemoryNodeDecorator: DecoratorFn = (Story, args) => (
  <MemoryNodeProvider config={{ schema: NodeConfigSchema }}>
    <Story {...args} />
  </MemoryNodeProvider>
)

const AddModulesDecorator: DecoratorFn = (Story, args) => {
  const list = { AddressHistoryDiviner: Symbol('AddressHistoryDiviner') }
  useAddNamedModules(list, { apiDomain: 'http://localhost:8080' })
  return <Story {...args} />
}

// eslint-disable-next-line import/no-default-export
export default {
  component: NodeQueryDiviner,
  decorators: [AddModulesDecorator, MemoryNodeDecorator],
  title: 'node/NodeQueryDiviner',
}

const Template: ComponentStory<typeof NodeQueryDiviner> = () => <NodeQueryDiviner />

const Default = Template.bind({})
Default.args = {}

export { Default }
