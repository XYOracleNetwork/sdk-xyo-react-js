import { MemoryNode } from '@xyo-network/node'
import { HDWallet } from '@xyo-network/protocol'
import { defaultNetworkConfigs } from '@xyo-network/react-network'
import { assertDefinedEx } from '@xyo-network/react-shared'

import { MemoryNodeBuilder } from './Builders'
import { RemoteNodeArchivistOffsetPaths, RemoteNodeOffsetPaths } from './ModuleAccountPaths'
import { RootStorageArchivist } from './ModuleNames'

const knownRemoteNodes = (): { apiDomain: string; name: string }[] => {
  const networkNames = defaultNetworkConfigs.map((config) => config.name)
  return networkNames.map((networkName) => {
    const name = assertDefinedEx<string>(networkName, 'missing name in network config')
    const uri = defaultNetworkConfigs.filter((config) => config.name === networkName)[0].nodes?.filter((node) => node.type === 'archivist')[0].uri
    const apiDomain = assertDefinedEx<string>(uri, 'missing node type "archivist" in network config')
    return {
      apiDomain,
      name,
    }
  })
}

export const BuildStandardNodes = async (wallet: HDWallet, onNodeBuilt?: (node: MemoryNode) => void): Promise<MemoryNode[]> => {
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
        assertDefinedEx(node, 'Memory Node was not built successfully')
        onNodeBuilt?.(node)

        return node
      }),
    )
  } catch (e) {
    throw new Error(`Error Creating Known Remote Nodes: ${e}`)
  }
}
