import { Huri } from '@xyo-network/core'
import { XyoNetworkConfig } from '@xyo-network/network'

export const findHuriNetwork = (huriInstance: Huri, networks?: XyoNetworkConfig[]) => {
  // see if huri archivist matches any archivist in the network configs
  return networks
    ?.filter((network) =>
      network.nodes.find((node) => {
        return node.type === 'archivist' && new URL(node.uri).hostname === huriInstance.archivist
      })
    )
    .shift()
}
