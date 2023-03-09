import { MemoryNode } from '@xyo-network/node'
import { HDWallet } from '@xyo-network/protocol'
import { defaultNetworkConfigs } from '@xyo-network/react-network'
import { assertDefinedEx } from '@xyo-network/react-shared'

import { MemoryNodeBuilder } from './Builders'
import { RemoteNodeArchivistOffsetPaths, RemoteNodeOffsetPaths } from './ModuleAccountPaths'
import { DevelopArchivist, RootStorageArchivist } from './ModuleNames'

const MainApiUrlFallback = 'https://beta.api.archivist.xyo.network'

const knownRemoteNodes = (): { apiDomain: string; name: string }[] => {
  const networkNames = defaultNetworkConfigs.map((config) => config.name)
  return networkNames.map((networkName) => {
    const name = assertDefinedEx<string>(networkName, 'missing name in network config')
    const uri = defaultNetworkConfigs.filter((config) => config.name === networkName)[0].nodes?.filter((node) => node.type === 'archivist')[0].uri
    const apiDomain = assertDefinedEx<string>(uri, 'missing node type "archivist" in network config')
    return {
      // Temporary till main is compatible with /node endpoint
      apiDomain: name === 'Main' ? MainApiUrlFallback : apiDomain,
      name,
    }
  })
}

export const BuildStandardNodes = async (wallet: HDWallet): Promise<MemoryNode[]> => {
  try {
    return await Promise.all(
      knownRemoteNodes().map(async ({ apiDomain, name }) => {
        const remoteNodeOffset = RemoteNodeOffsetPaths[name]
        const remoteNodeWallet = wallet.derivePath(remoteNodeOffset)

        const memoryNodeBuilder = await MemoryNodeBuilder.create({ name }, remoteNodeWallet.deriveAccount('0'))
        await memoryNodeBuilder.addBridge(apiDomain)

        const rootArchivistPath = `${remoteNodeOffset}/${RemoteNodeArchivistOffsetPaths[name][RootStorageArchivist]}`
        const rootArchivistAccount = wallet.deriveAccount(rootArchivistPath)
        await memoryNodeBuilder.addArchivist(rootArchivistAccount, RootStorageArchivist, 'root')

        const developArchivistPath = `${remoteNodeOffset}/${RemoteNodeArchivistOffsetPaths[name][DevelopArchivist]}`
        const developArchivistAccount = wallet.deriveAccount(developArchivistPath)
        await memoryNodeBuilder.addArchivist(developArchivistAccount, DevelopArchivist, 'develop')

        return assertDefinedEx(memoryNodeBuilder.node, 'Memory Node was not built successfully')
      }),
    )
  } catch (e) {
    throw new Error(`Error Creating Known Remote Nodes: ${e}`)
  }
}
