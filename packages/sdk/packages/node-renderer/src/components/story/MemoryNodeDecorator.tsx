import { DecoratorFn } from '@storybook/react'
import { useAsyncEffect } from '@xylabs/react-shared'
import { HDWallet } from '@xyo-network/account'
import { ArchivistConfigSchema, MemoryArchivist } from '@xyo-network/archivist'
import { HttpBridge, HttpBridgeConfigSchema } from '@xyo-network/bridge'
import { MemoryNode, NodeConfigSchema } from '@xyo-network/node'
import { NodeProvider } from '@xyo-network/react-node'
import { DefaultSeedPhrase } from '@xyo-network/react-storybook'
import { WalletProvider } from '@xyo-network/react-wallet'
import { useState } from 'react'

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
