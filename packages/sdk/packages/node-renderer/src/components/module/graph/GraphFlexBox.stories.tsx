import { Decorator, Meta, StoryFn } from '@storybook/react'
import { useAsyncEffect } from '@xylabs/react-async-effect'
import { MemoryArchivist, MemoryArchivistConfigSchema } from '@xyo-network/archivist'
import { HttpBridge, HttpBridgeConfigSchema } from '@xyo-network/http-bridge'
import { MemoryNode } from '@xyo-network/node-memory'
import { NodeConfigSchema } from '@xyo-network/node-model'
import { NodeProvider, useProvidedNode } from '@xyo-network/react-node'
import { DefaultSeedPhrase } from '@xyo-network/react-storybook'
import { useWallet, WalletProvider } from '@xyo-network/react-wallet'
import { MemorySentinel, SentinelConfigSchema } from '@xyo-network/sentinel'
import { useState } from 'react'

import { ModuleGraphFlexBoxWithProvider } from './GraphFlexBox'

const nodeUrl = 'http://localhost:8080/node'

const MemoryNodeDecorator: Decorator = (Story, args) => {
  const [node, setNode] = useState<MemoryNode>()

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async () => {
      try {
        const node = await MemoryNode.create({ config: { name: 'GlobalNode', schema: NodeConfigSchema } })
        const node1 = await MemoryNode.create({ config: { name: 'ChildNode', schema: NodeConfigSchema } })
        const bridge = await HttpBridge.create({
          config: { name: 'Bridge', nodeUrl, schema: HttpBridgeConfigSchema, security: { allowAnonymous: true } },
        })
        await node.register(bridge)
        await node.attach(bridge.address, true)

        const archivist = await MemoryArchivist.create({ config: { name: 'RootStorageArchivist', schema: MemoryArchivistConfigSchema } })
        await node.register(archivist)
        await node.attach(archivist.address, true)

        const sentinel = await MemorySentinel.create({ config: { name: 'MemorySentinel', schema: SentinelConfigSchema } })
        await node.register(sentinel)
        await node.attach(sentinel.address, true)

        const archivist1 = await MemoryArchivist.create({ config: { name: 'RootStorageArchivist1', schema: MemoryArchivistConfigSchema } })
        await node1.register(archivist1)
        await node1.attach(archivist1.address, true)

        await node.register(node1)
        await node.attach(node1.address, true)

        setNode(node)
      } catch (e) {
        console.error('Error Creating MemoryNode', e)
      }
    },
    [],
  )

  const [wallet] = useWallet({ mnemonic: DefaultSeedPhrase })

  return (
    <WalletProvider rootWallet={wallet}>
      <NodeProvider node={node}>
        <Story {...args} />
      </NodeProvider>
    </WalletProvider>
  )
}

// eslint-disable-next-line import/no-default-export
export default {
  component: ModuleGraphFlexBoxWithProvider,
  title: 'node/renderer/ModuleGraphFlexBoxWithProvider',
} as Meta

const Template: StoryFn<typeof ModuleGraphFlexBoxWithProvider> = (props) => <ModuleGraphFlexBoxWithProvider {...props} />

const TemplateWithProvidedModule: StoryFn<typeof ModuleGraphFlexBoxWithProvider> = (props) => {
  const [node] = useProvidedNode()
  return <ModuleGraphFlexBoxWithProvider rootModule={node} {...props} />
}

const defaultProps = {
  height: 'calc(100vh - 20px)',
  width: '100%',
}

const Default = Template.bind({})
Default.args = {}
Default.decorators = [MemoryNodeDecorator]

const WithProvidedNode = TemplateWithProvidedModule.bind({})
WithProvidedNode.args = { ...defaultProps }
WithProvidedNode.decorators = [MemoryNodeDecorator]

export { Default, WithProvidedNode }