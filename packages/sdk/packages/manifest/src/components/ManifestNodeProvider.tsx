import { usePromise } from '@xylabs/react-promise'
import { NodeProvider } from '@xyo-network/react-node-provider'
import { PropsWithChildren } from 'react'

import { buildManifestNodes } from '../lib'
import { CreatablePackageManifest } from '../types'

export interface ManifestNodeProviderProps extends PropsWithChildren {
  manifestNodes?: CreatablePackageManifest[]
}

export const ManifestNodeProvider: React.FC<ManifestNodeProviderProps> = ({ children, manifestNodes }) => {
  const [indexedResultsNode] = usePromise(async () => await buildManifestNodes(manifestNodes), [manifestNodes])

  return <NodeProvider node={indexedResultsNode}>{children}</NodeProvider>
}
