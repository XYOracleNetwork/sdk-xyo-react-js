import { ComponentStory, DecoratorFn, Meta } from '@storybook/react'
import { useAsyncEffect } from '@xylabs/react-shared'
import { HDWallet } from '@xyo-network/account'
import { ArchivistConfigSchema, MemoryArchivist } from '@xyo-network/archivist'
import { HttpBridge, HttpBridgeConfigSchema } from '@xyo-network/bridge'
import { ModuleWrapper } from '@xyo-network/module'
import { MemoryNode, NodeConfigSchema, NodeWrapper } from '@xyo-network/node'
import { NodeProvider, useProvidedNode } from '@xyo-network/react-node'
import { DefaultSeedPhrase } from '@xyo-network/react-storybook'
import { WalletProvider } from '@xyo-network/react-wallet'
import { CytoscapeOptions } from 'cytoscape'
import { useState } from 'react'

import { useCytoscapeOptions } from '../hooks'
import { NodeRelationalGraph } from './RelationalGraph'
import { options } from './story'

const nodeUrl = 'http://localhost:8080/node'
const randomWallet = HDWallet.fromMnemonic(DefaultSeedPhrase)

const MemoryNodeDecorator: DecoratorFn = (Story, args) => {
  const [node, setNode] = useState<MemoryNode>()

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async () => {
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

      const archivist1 = await MemoryArchivist.create({ config: { name: 'RootStorageArchivist1', schema: ArchivistConfigSchema } })
      await node1.register(archivist1)
      await node1.attach(archivist1.address, true)

      await node.register(node1)
      await node.attach(node1.address, true)

      setNode(node)
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

const Template: ComponentStory<typeof NodeRelationalGraph> = (props) => <NodeRelationalGraph {...props} />
const TemplateDescribe: ComponentStory<typeof NodeRelationalGraph> = (props) => {
  const [node] = useProvidedNode()
  const [elements, setElements] = useState<CytoscapeOptions['elements']>()
  const options = useCytoscapeOptions(elements)

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async () => {
      if (node) {
        try {
          const newElements = []
          const wrapper = NodeWrapper.wrap(node)
          const description = await wrapper?.describe()
          const rootNodeId = description.name ?? description.address.substring(0, 6)
          newElements.push({
            data: { id: rootNodeId },
          })
          const children = description.children
          await Promise.all(
            (children ?? [])?.map(async (address) => {
              const [result] = await wrapper.resolveWrapped(ModuleWrapper, { address: [address] })
              try {
                const description = await result.describe()
                const newNodeId = description.name ?? description.address.substring(0, 6)
                const newNode = {
                  data: {
                    id: newNodeId,
                  },
                }
                newElements.push(newNode)
                const newEdge = {
                  data: {
                    id: `${rootNodeId}/${newNodeId}`,
                    source: rootNodeId,
                    target: newNodeId,
                  },
                }
                newElements.push(newEdge)
              } catch (e) {
                console.error(e, result)
              }
            }),
          )
          setElements(newElements)
        } catch (e) {
          console.error(e)
        }
      }
    },
    [node],
  )
  return <NodeRelationalGraph options={options} {...props} />
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

export { Default, WithData, WithDescribe }
