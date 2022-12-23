import { ComponentStory, DecoratorFn, Meta } from '@storybook/react'
import { NodeConfigSchema } from '@xyo-network/node'
import { TYPES } from '@xyo-network/node-core-types'
import { MemoryNodeProvider, useAddNamedModules } from '@xyo-network/react-node'

import { TestSchemaHooks } from './TestSchemaHooks'

const MemoryNodeDecorator: DecoratorFn = (Story, args) => (
  <MemoryNodeProvider config={{ schema: NodeConfigSchema }}>
    <Story {...args} />
  </MemoryNodeProvider>
)

const AddModulesDecorator: DecoratorFn = (Story, args) => {
  const list = { SchemaStatsDiviner: TYPES.SchemaStatsDiviner }
  useAddNamedModules(list, { apiDomain: 'http://localhost:8080' })
  return <Story {...args} />
}

// eslint-disable-next-line import/no-default-export
export default {
  component: TestSchemaHooks,
  decorators: [AddModulesDecorator, MemoryNodeDecorator],
  title: 'schema/Hooks',
} as Meta

const Template: ComponentStory<typeof TestSchemaHooks> = (args) => <TestSchemaHooks {...args} />

const Default = Template.bind({})
Default.args = {}

export { Default }
