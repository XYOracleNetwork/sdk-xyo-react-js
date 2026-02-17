import { Button, ButtonGroup } from '@mui/material'
import type {
  Decorator, Meta, StoryFn,
} from '@storybook/react-vite'
import { useAsyncEffect } from '@xylabs/react-async-effect'
import { MemoryArchivist, MemoryArchivistConfigSchema } from '@xyo-network/archivist-memory'
import { HttpBridge, HttpBridgeConfigSchema } from '@xyo-network/bridge-http'
import { IdWitness, IdWitnessConfigSchema } from '@xyo-network/id-plugin'
import type { AttachableModuleInstance } from '@xyo-network/module-model'
import { MemoryNode } from '@xyo-network/node-memory'
import { NodeConfigSchema } from '@xyo-network/node-model'
import {
  NodeProvider, useWeakNodeFromNode, useWeakProvidedNode,
} from '@xyo-network/react-node'
import { DefaultSeedPhrase } from '@xyo-network/react-storybook'
import { useWallet, WalletProvider } from '@xyo-network/react-wallet'
import { SentinelConfigSchema } from '@xyo-network/sentinel'
import { MemorySentinel } from '@xyo-network/sentinel-memory'
import React, { useState } from 'react'

import { CytoscapeInstanceProvider } from '../../../contexts/index.ts'
import { useCytoscapeElements, useCytoscapeOptions } from '../../../hooks/index.ts'
import { NodeRelationalGraphFlexBox } from './Graph.tsx'
import { ProvidedNodeRenderer } from './ProvidedNodeRenderer.tsx'
import { options } from './story/index.ts'

const client = { url: 'http://localhost:8080/node' }

const MemoryNodeDecorator: Decorator = (Story, args) => {
  const [node, setNode] = useState<MemoryNode>()

  useAsyncEffect(
    async () => {
      try {
        const node = await MemoryNode.create({ config: { name: 'GlobalNode', schema: NodeConfigSchema } })
        const node1 = await MemoryNode.create({ config: { name: 'ChildNode', schema: NodeConfigSchema } })
        const bridge = await HttpBridge.create({
          config: {
            name: 'Bridge', client, schema: HttpBridgeConfigSchema, security: { allowAnonymous: true },
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
        <CytoscapeInstanceProvider>
          <Story {...args} />
        </CytoscapeInstanceProvider>
      </NodeProvider>
    </WalletProvider>
  )
}

export default {
  component: NodeRelationalGraphFlexBox,
  parameters: { layout: 'fullscreen' },
  title: 'node/renderer/NodeRelationalGraph',
} as Meta

const Template: StoryFn<typeof NodeRelationalGraphFlexBox> = props => <NodeRelationalGraphFlexBox {...props} />

const TemplateDescribe: StoryFn<typeof NodeRelationalGraphFlexBox> = (props) => {
  const [node] = useWeakProvidedNode()
  const elements = useCytoscapeElements(node)
  const options = useCytoscapeOptions(elements)
  return <NodeRelationalGraphFlexBox options={options} {...props} />
}

const TemplateCustomAddress: StoryFn<typeof NodeRelationalGraphFlexBox> = (props) => {
  const [node] = useWeakNodeFromNode('ChildNode')
  const elements = useCytoscapeElements(node)
  const options = useCytoscapeOptions(elements)

  return <NodeRelationalGraphFlexBox options={options} {...props} />
}

const TemplateProvidedNodeRenderer: StoryFn<typeof ProvidedNodeRenderer> = (props) => {
  const [layout, setLayout] = useState<'dagre' | 'euler' | 'cose-bilkent' | 'cola'>('euler')
  return (
    <div style={{
      height: '100vh', width: '100vw', position: 'relative',
    }}
    >
      <ButtonGroup>
        <Button variant={layout === 'dagre' ? 'contained' : 'outlined'} onClick={() => setLayout('dagre')}>Dagre</Button>
        <Button variant={layout === 'euler' ? 'contained' : 'outlined'} onClick={() => setLayout('euler')}>Euler</Button>
        <Button variant={layout === 'cose-bilkent' ? 'contained' : 'outlined'} onClick={() => setLayout('cose-bilkent')}>CoseBilkent</Button>
        <Button variant={layout === 'cola' ? 'contained' : 'outlined'} onClick={() => setLayout('cola')}>Cola</Button>
      </ButtonGroup>
      <ProvidedNodeRenderer {...props} layout={layout} />
    </div>
  )
}

const TemplateAttachDetach: StoryFn<typeof NodeRelationalGraphFlexBox> = (props) => {
  const [node] = useWeakNodeFromNode('ChildNode')
  const elements = useCytoscapeElements(node)
  const options = useCytoscapeOptions(elements)
  const [idWitness, setIdWitness] = useState<IdWitness>()
  const [layout, setLayout] = useState<'dagre' | 'euler' | 'cose-bilkent' | 'cola'>('euler')

  useAsyncEffect(
    async () => {
      const witnessModule = await IdWitness.create({
        config: {
          name: 'IdWitness', salt: 'test', schema: IdWitnessConfigSchema,
        },
      })
      setIdWitness(witnessModule)
    },
    [],
  )

  const handleAddWitness = async () => {
    if (node && idWitness) {
      const memoryNode = node.deref() as MemoryNode | undefined
      await memoryNode?.register(idWitness as unknown as AttachableModuleInstance)
      await memoryNode?.attach(idWitness.address, true)
    }
  }

  const handleRemoveWitness = async () => {
    if (node && idWitness) {
      const memoryNode = node.deref() as MemoryNode | undefined
      if (((await memoryNode?.registered()) ?? []).includes(idWitness.address)) {
        await memoryNode?.unregister(idWitness as unknown as AttachableModuleInstance)
      }
    }
  }

  return (
    <>
      <ButtonGroup>
        <Button onClick={handleAddWitness}>Add Witness</Button>
        <Button onClick={handleRemoveWitness}>Remove Witness</Button>
        <Button onClick={() => setLayout('dagre')}>Dagre</Button>
        <Button onClick={() => setLayout('euler')}>Euler</Button>
        <Button onClick={() => setLayout('cose-bilkent')}>CoseBilkent</Button>
        <Button onClick={() => setLayout('cola')}>Cola</Button>
      </ButtonGroup>
      <NodeRelationalGraphFlexBox layout={layout} options={options} {...props} />
    </>
  )
}

const Default = Template.bind({})
Default.args = {}

const WithData = Template.bind({})
WithData.args = { options }

const WithDescribe = TemplateDescribe.bind({})
WithDescribe.args = {}
WithDescribe.decorators = [MemoryNodeDecorator]

const WithCustomAddress = TemplateCustomAddress.bind({})
WithCustomAddress.args = {}
WithCustomAddress.decorators = [MemoryNodeDecorator]

const WithAttachDetach = TemplateAttachDetach.bind({})
WithAttachDetach.args = {}
WithAttachDetach.decorators = [MemoryNodeDecorator]

const WithProvidedNodeRenderer = TemplateProvidedNodeRenderer.bind({})
WithProvidedNodeRenderer.args = {}
WithProvidedNodeRenderer.decorators = [MemoryNodeDecorator]

export {
  Default, WithAttachDetach, WithCustomAddress, WithData, WithDescribe, WithProvidedNodeRenderer,
}
