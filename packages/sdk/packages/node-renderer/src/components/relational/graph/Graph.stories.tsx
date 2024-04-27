import { Button, ButtonGroup } from '@mui/material'
import { Decorator, Meta, StoryFn } from '@storybook/react'
import { useAsyncEffect } from '@xylabs/react-async-effect'
import { MemoryArchivist, MemoryArchivistConfigSchema } from '@xyo-network/archivist'
import { HttpBridge, HttpBridgeConfigSchema } from '@xyo-network/http-bridge'
import { IdWitness, IdWitnessConfigSchema } from '@xyo-network/id-plugin'
import { MemoryNode } from '@xyo-network/node-memory'
import { NodeConfigSchema } from '@xyo-network/node-model'
import { NodeProvider, useNodeFromNode, useWeakNodeFromNode, useWeakProvidedNode } from '@xyo-network/react-node'
import { DefaultSeedPhrase } from '@xyo-network/react-storybook'
import { useWallet, WalletProvider } from '@xyo-network/react-wallet'
import { MemorySentinel, SentinelConfigSchema } from '@xyo-network/sentinel'
import { useState } from 'react'

import { CytoscapeInstanceProvider } from '../../../contexts'
import { useCytoscapeElements, useCytoscapeOptions } from '../../../hooks'
import { NodeRelationalGraphFlexBox } from './Graph'
import { ProvidedNodeRenderer } from './ProvidedNodeRenderer'
import { options } from './story'

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

        const sentinel = await MemorySentinel.create({
          config: { name: 'MemorySentinel', schema: SentinelConfigSchema, synchronous: true, tasks: [] },
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

// eslint-disable-next-line import/no-default-export
export default {
  component: NodeRelationalGraphFlexBox,
  title: 'node/renderer/NodeRelationalGraph',
} as Meta

const Template: StoryFn<typeof NodeRelationalGraphFlexBox> = (props) => <NodeRelationalGraphFlexBox {...props} />

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
  return <div>
    <ButtonGroup>
      <Button onClick={() => setLayout('dagre')}>Dagre</Button>
      <Button onClick={() => setLayout('euler')}>Euler</Button>
      <Button onClick={() => setLayout('cose-bilkent')}>CoseBilkent</Button>
      <Button onClick={() => setLayout('cola')}>Cola</Button>
    </ButtonGroup>
    <ProvidedNodeRenderer {...props} layout={layout} />
  </div>
}

const TemplateAttachDetach: StoryFn<typeof NodeRelationalGraphFlexBox> = (props) => {
  const [node] = useWeakNodeFromNode('ChildNode')
  const elements = useCytoscapeElements(node)
  const options = useCytoscapeOptions(elements)
  const [idWitness, setIdWitness] = useState<IdWitness>()
  const [layout, setLayout] = useState<'dagre' | 'euler' | 'cose-bilkent' | 'cola'>('euler')

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async () => {
      const witnessModule = await IdWitness.create({ config: { name: 'IdWitness', salt: 'test', schema: IdWitnessConfigSchema } })
      setIdWitness(witnessModule)
    },
    [],
  )

  const handleAddWitness = async () => {
    if (node && idWitness) {
      const memoryNode = node.deref() as MemoryNode | undefined
      await memoryNode?.register(idWitness)
      await memoryNode?.attach(idWitness.address, true)
    }
  }

  const handleRemoveWitness = async () => {
    if (node && idWitness) {
      const memoryNode = node.deref() as MemoryNode | undefined
      if (memoryNode?.registered().includes(idWitness.address)) {
        await memoryNode?.unregister(idWitness)
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

const defaultProps = {
  height: 'calc(100vh - 20px)',
  width: '100%',
}

const Default = Template.bind({})
Default.args = {}

const WithData = Template.bind({})
WithData.args = { options, ...defaultProps }

const WithDescribe = TemplateDescribe.bind({})
WithDescribe.args = { ...defaultProps }
WithDescribe.decorators = [MemoryNodeDecorator]

const WithCustomAddress = TemplateCustomAddress.bind({})
WithCustomAddress.args = { ...defaultProps }
WithCustomAddress.decorators = [MemoryNodeDecorator]

const WithAttachDetach = TemplateAttachDetach.bind({})
WithAttachDetach.args = { ...defaultProps }
WithAttachDetach.decorators = [MemoryNodeDecorator]

const WithProvidedNodeRenderer = TemplateProvidedNodeRenderer.bind({})
WithProvidedNodeRenderer.args = { ...defaultProps }
WithProvidedNodeRenderer.decorators = [MemoryNodeDecorator]

export { Default, WithAttachDetach, WithCustomAddress, WithData, WithDescribe, WithProvidedNodeRenderer }
