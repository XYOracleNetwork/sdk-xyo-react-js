import { Button, ButtonGroup } from '@mui/material'
import type {
  Decorator, Meta, StoryFn,
} from '@storybook/react'
import { useAsyncEffect } from '@xylabs/react-async-effect'
import { MemoryArchivist, MemoryArchivistConfigSchema } from '@xyo-network/archivist-memory'
import { HttpBridge, HttpBridgeConfigSchema } from '@xyo-network/bridge-http'
import { MemoryNode } from '@xyo-network/node-memory'
import { NodeConfigSchema } from '@xyo-network/node-model'
import { NodeProvider, useWeakProvidedNode } from '@xyo-network/react-node'
import { DefaultSeedPhrase } from '@xyo-network/react-storybook'
import { useWallet, WalletProvider } from '@xyo-network/react-wallet'
import { SentinelConfigSchema } from '@xyo-network/sentinel'
import { MemorySentinel } from '@xyo-network/sentinel-memory'
import React, { useState } from 'react'

import { ModuleGraphFlexBoxWithProvider } from './GraphFlexBox.tsx'

const nodeUrl = 'http://localhost:8080/node'

const MemoryNodeDecorator: Decorator = (Story, args) => {
  const [node, setNode] = useState<MemoryNode>()

  useAsyncEffect(

    async () => {
      try {
        const node = await MemoryNode.create({ config: { name: 'GlobalNode', schema: NodeConfigSchema } })
        const node1 = await MemoryNode.create({ config: { name: 'ChildNode', schema: NodeConfigSchema } })
        const bridge = await HttpBridge.create({
          config: {
            name: 'Bridge', nodeUrl, schema: HttpBridgeConfigSchema, security: { allowAnonymous: true },
          },
        })
        await node.register(bridge)
        await node.attach(bridge.address, true)

        const archivist = await MemoryArchivist.create({ config: { name: 'RootStorageArchivist', schema: MemoryArchivistConfigSchema } })
        await node.register(archivist)
        await node.attach(archivist.address, true)

        const sentinel = await MemorySentinel.create({
          config: {
            name: 'MemorySentinel', schema: SentinelConfigSchema, synchronous: true, tasks: [],
          },
        })
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

export default {
  component: ModuleGraphFlexBoxWithProvider,
  title: 'node/renderer/ModuleGraphFlexBoxWithProvider',
} as Meta

const Template: StoryFn<typeof ModuleGraphFlexBoxWithProvider> = props => <ModuleGraphFlexBoxWithProvider {...props} />

const TemplateWithProvidedModule: StoryFn<typeof ModuleGraphFlexBoxWithProvider> = (props) => {
  const [node] = useWeakProvidedNode()
  const [layout, setLayout] = useState<'dagre' | 'euler' | 'cose-bilkent' | 'cola'>('euler')
  return (
    <div>
      <ButtonGroup>
        <Button onClick={() => setLayout('dagre')}>Dagre</Button>
        <Button onClick={() => setLayout('euler')}>Euler</Button>
        <Button onClick={() => setLayout('cose-bilkent')}>CoseBilkent</Button>
        <Button onClick={() => setLayout('cola')}>Cola</Button>
      </ButtonGroup>
      <ModuleGraphFlexBoxWithProvider rootModule={node} {...props} layout={layout} />
    </div>
  )
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

const WithDisabledDetails = TemplateWithProvidedModule.bind({})
WithDisabledDetails.args = { ...defaultProps, disableModuleDetails: true }
WithDisabledDetails.decorators = [MemoryNodeDecorator]

export {
  Default, WithDisabledDetails, WithProvidedNode,
}
