import { usePromise } from '@xylabs/react-promise'
import { HDWallet } from '@xyo-network/account'
import { ManifestWrapper, PackageManifest } from '@xyo-network/manifest'
import { ModuleFactoryLocator } from '@xyo-network/module'
import { NodeProvider } from '@xyo-network/react-node-provider'
import { DefaultSeedPhrase } from '@xyo-network/react-storybook'
import { TimestampWitness } from '@xyo-network/witness-timestamp'
import { PropsWithChildren } from 'react'

import { AddDayDiviner } from './AddDayDiviner'
import DateTimeSentinel from './manifest.json'

export const IndexedResultsNodeProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [indexedResultsNode] = usePromise(async () => {
    try {
      const locator = new ModuleFactoryLocator()
      locator.register(TimestampWitness)
      locator.register(AddDayDiviner)
      const wallet = await HDWallet.fromPhrase(DefaultSeedPhrase)
      const manifest = new ManifestWrapper(DateTimeSentinel as PackageManifest, wallet, locator)

      const [node] = await manifest.loadNodes()
      return node
    } catch (e) {
      console.error('Error creating IndexedResultsNode', e)
      throw e
    }
  }, [])

  return <NodeProvider node={indexedResultsNode}>{children}</NodeProvider>
}
