import { Button, ButtonGroup } from '@mui/material'
import { DecoratorFn, Meta, StoryFn } from '@storybook/react'
import { useAsyncEffect } from '@xylabs/react-async-effect'
import { HDWallet } from '@xyo-network/account'
import { ArchivistConfigSchema, MemoryArchivist } from '@xyo-network/archivist'
import { HttpBridge, HttpBridgeConfigSchema } from '@xyo-network/bridge'
import { IdWitness, IdWitnessConfigSchema } from '@xyo-network/id-plugin'
import { MemoryNode, NodeConfigSchema, NodeWrapper } from '@xyo-network/node'
import { NodeProvider, useModule, useProvidedWrappedNode } from '@xyo-network/react-node'
import { DefaultSeedPhrase } from '@xyo-network/react-storybook'
import { WalletProvider } from '@xyo-network/react-wallet'
import { MemorySentinel, SentinelConfigSchema } from '@xyo-network/sentinel'
import { useMemo, useState } from 'react'

import { useCytoscapeElements, useCytoscapeOptions } from '../hooks'
import { NodeRelationalGraph } from './RelationalGraph'
import { options } from './story'

const nodeUrl = 'http://localhost:8080/node'
const randomWallet = HDWallet.fromMnemonic(DefaultSeedPhrase)

export const MemoryNodeDecorator: DecoratorFn = (Story, args) => {
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

        const archivist = await MemoryArchivist.create({ config: { name: 'RootStorageArchivist', schema: ArchivistConfigSchema } })
        await node.register(archivist)
        await node.attach(archivist.address, true)

        const sentinel = await MemorySentinel.create({ config: { name: 'MemorySentinel', schema: SentinelConfigSchema } })
        await node.register(sentinel)
        await node.attach(sentinel.address, true)

        const archivist1 = await MemoryArchivist.create({ config: { name: 'RootStorageArchivist1', schema: ArchivistConfigSchema } })
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

  return (
    <WalletProvider defaultWallet={randomWallet}>
      <NodeProvider node={node}>
        <Story {...args} />
      </NodeProvider>
    </WalletProvider>
  )
}

// eslint-disable-next-line import/no-default-export
export default {
  component: NodeRelationalGraph,
  title: 'node/renderer/NodeRelationalGraph',
} as Meta

const Template: StoryFn<typeof NodeRelationalGraph> = (props) => <NodeRelationalGraph {...props} />

const TemplateDescribe: StoryFn<typeof NodeRelationalGraph> = (props) => {
  const [node] = useProvidedWrappedNode()
  const elements = useCytoscapeElements(node)
  const options = useCytoscapeOptions(elements)
  return <NodeRelationalGraph options={options} {...props} />
}

const TemplateCustomAddress: StoryFn<typeof NodeRelationalGraph> = (props) => {
  const [node] = useModule('ChildNode')
  const wrappedNode = useMemo(() => (node ? NodeWrapper.wrap(node) : undefined), [node])
  const elements = useCytoscapeElements(wrappedNode)
  const options = useCytoscapeOptions(elements)
  return <NodeRelationalGraph options={options} {...props} />
}

const TemplateAttachDetach: StoryFn<typeof NodeRelationalGraph> = (props) => {
  const [node] = useModule('ChildNode')
  const wrappedNode = useMemo(() => (node ? NodeWrapper.wrap(node) : undefined), [node])
  const elements = useCytoscapeElements(wrappedNode)
  const options = useCytoscapeOptions(elements)
  const [idWitness, setIdWitness] = useState<IdWitness>()

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async () => {
      const witnessModule = await IdWitness.create({ config: { name: 'IdWitness', salt: 'test', schema: IdWitnessConfigSchema } })
      setIdWitness(witnessModule)
    },
    [],
  )

  const handleAddWitness = async () => {
    if (wrappedNode && idWitness) {
      const memoryNode = wrappedNode as NodeWrapper<MemoryNode>
      await memoryNode.module.register(idWitness)
      await memoryNode.attach(idWitness.address, true)
    }
  }

  const handleRemoveWitness = async () => {
    if (wrappedNode && idWitness) {
      const memoryNode = wrappedNode as NodeWrapper<MemoryNode>
      if (await (await memoryNode.registered()).includes(idWitness.address)) {
        await memoryNode.module.unregister(idWitness)
      }
    }
  }

  return (
    <>
      <ButtonGroup>
        <Button onClick={handleAddWitness}>Add Witness</Button>
        <Button onClick={handleRemoveWitness}>Remove Witness</Button>
      </ButtonGroup>
      <NodeRelationalGraph options={options} {...props} />
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

export { Default, WithAttachDetach, WithCustomAddress, WithData, WithDescribe }
