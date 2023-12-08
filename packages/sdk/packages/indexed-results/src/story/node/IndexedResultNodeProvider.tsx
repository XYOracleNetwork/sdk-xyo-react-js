import { usePromise } from '@xylabs/react-promise'
import { PackageManifestPayload } from '@xyo-network/manifest'
import { NodeProvider } from '@xyo-network/react-node-provider'
import { PropsWithChildren } from 'react'

import { BaseNode } from './BaseNode'
import { sentinelManifest } from './manifests'

export const IndexedResultsNodeProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [indexedResultsNode] = usePromise(async () => {
    try {
      const publicChildren = [sentinelManifest] as PackageManifestPayload[]
      const node = await BaseNode(publicChildren)
      return node
    } catch (e) {
      console.error('Error creating IndexedResultsNode', e)
      throw e
    }
  }, [])

  return <NodeProvider node={indexedResultsNode}>{children}</NodeProvider>
}
