import { assertDefinedEx } from '@xylabs/assert'
import type { MemoryNode } from '@xyo-network/node-memory'
import { defaultNetworkConfigs } from '@xyo-network/react-network'
import type { WalletInstance } from '@xyo-network/wallet-model'

import { MemoryNodeBuilder } from './Builders/index.ts'
import { RemoteNodeArchivistOffsetPaths, RemoteNodeOffsetPaths } from './ModuleAccountPaths.ts'
import { RootStorageArchivist } from './ModuleNames.ts'

const knownRemoteNodes = (): { apiDomain: string; name: string }[] => {
  const networkNames = defaultNetworkConfigs.map(config => config.name)
  return networkNames.map((networkName) => {
    const name = assertDefinedEx<string>(networkName, () => 'missing name in network config')
    const uri = defaultNetworkConfigs.find(config => config.name === networkName)?.nodes?.filter(node => node.type === 'archivist')[0].uri
    const apiDomain = assertDefinedEx<string>(uri, () => 'missing node type "archivist" in network config')
    return {
      apiDomain,
      name,
    }
  })
}

export const BuildStandardNodes = async (wallet: WalletInstance, onNodeBuilt?: (node: MemoryNode) => void): Promise<MemoryNode[]> => {
  try {
    return await Promise.all(
      knownRemoteNodes().map(async ({ apiDomain, name }) => {
        const remoteNodeOffset = RemoteNodeOffsetPaths[name]
        const remoteNodeWallet = await wallet.derivePath?.(remoteNodeOffset)

        const memoryNodeBuilder = await MemoryNodeBuilder.create({ name }, await remoteNodeWallet.derivePath?.('0'))
        await memoryNodeBuilder.addBridge(apiDomain)

        const rootArchivistPath = `${remoteNodeOffset}/${RemoteNodeArchivistOffsetPaths[name][RootStorageArchivist]}`
        const rootArchivistAccount = await wallet.derivePath?.(rootArchivistPath)
        await memoryNodeBuilder.addArchivistStorage(rootArchivistAccount, RootStorageArchivist, 'root')

        const { node } = memoryNodeBuilder
        assertDefinedEx(node, () => 'Memory Node was not built successfully')
        onNodeBuilt?.(node)

        return node
      }),
    )
  } catch (e) {
    throw new Error(`Error Creating Known Remote Nodes: ${e}`)
  }
}
