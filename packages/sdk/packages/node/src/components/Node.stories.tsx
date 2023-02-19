import { ComponentStory, DecoratorFn, Meta } from '@storybook/react'
import { useAsyncEffect } from '@xylabs/react-shared'
import { AbstractModule } from '@xyo-network/module'
import { MemoryNode, NodeConfigSchema, NodeWrapper } from '@xyo-network/node'
import { useState } from 'react'

import { MemoryNodeProvider, useNode } from '../contexts'

class TestModule extends AbstractModule {}

const MemoryNodeDecorator: DecoratorFn = (Story, args) => {
  return (
    <MemoryNodeProvider config={{ schema: NodeConfigSchema }}>
      <Story {...args} />
    </MemoryNodeProvider>
  )
}

// eslint-disable-next-line import/no-default-export
export default {
  title: 'node/NodeBox',
} as Meta

const Template: ComponentStory<React.FC> = (props) => {
  const [node] = useNode<MemoryNode>(false)
  const [description, setDescription] = useState<string>()

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async (mounted) => {
      if (node) {
        try {
          const mod = await TestModule.create({ config: { schema: 'network.xyo.test.module' } })
          node?.register(mod)
          await node?.attach(mod.address)
          const wrapper = NodeWrapper.wrap(node)
          const description = await wrapper?.describe()
          if (mounted()) {
            setDescription(JSON.stringify(description, null, 2))
          }
        } catch (e) {
          console.error(e)
        }
      }
    },
    [node],
  )

  return (
    <div {...props}>
      <pre>{description}</pre>
    </div>
  )
}

const Default = Template.bind({})
Default.args = {}

const WithModules = Template.bind({})
WithModules.argTypes = {}
WithModules.decorators = [MemoryNodeDecorator]

export { Default, WithModules }
