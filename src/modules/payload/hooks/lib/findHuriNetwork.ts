import { Huri } from '@xyo-network/sdk-xyo-client-js'

import { XyoNetworkConfig } from '../../../network'

export const findHuriNetwork = (huriInstance: Huri, networks?: XyoNetworkConfig[]) => {
  // see if huri archivist matches any archivist in the network configs
  return networks?.filter(
    (network) =>
      network.archivists.filter((archivist) => {
        const apiUrl = new URL(archivist.urls.api)
        return apiUrl.hostname === huriInstance.archivist
      })[0]
  )[0]
}
