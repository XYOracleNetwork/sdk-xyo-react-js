import { ComponentStory, DecoratorFn, Meta } from '@storybook/react'
import { useAsyncEffect } from '@xylabs/react-shared'
import { HDWallet } from '@xyo-network/account'
import { ArchivistConfigSchema, MemoryArchivist } from '@xyo-network/archivist'
import { HttpBridge, HttpBridgeConfigSchema } from '@xyo-network/bridge'
import { IdWitness, IdWitnessConfigSchema } from '@xyo-network/id-plugin'
import { MemoryNode, NodeConfigSchema } from '@xyo-network/node'
import { NodeProvider } from '@xyo-network/react-node'
import { DefaultSeedPhrase } from '@xyo-network/react-storybook'
import { WalletProvider } from '@xyo-network/react-wallet'
import { useState } from 'react'

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

      const witnessModule = await IdWitness.create({ config: { name: 'IdWitness', salt: 'test', schema: IdWitnessConfigSchema } })
      await node1.register(witnessModule)
      await node1.attach(witnessModule.address, true)

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
  const elements = useCytoscapeElements()
  const options = useCytoscapeOptions(elements)
  return <NodeRelationalGraph options={options} {...props} />
}

const TemplateCustomAddress: ComponentStory<typeof NodeRelationalGraph> = (props) => {
  const elements = useCytoscapeElements('ChildNode')
  const options = useCytoscapeOptions(elements)
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

const WithCustomAddress = TemplateCustomAddress.bind({})
WithCustomAddress.args = { ...defaultProps }
WithCustomAddress.decorators = [MemoryNodeDecorator]

export { Default, WithCustomAddress, WithData, WithDescribe }
