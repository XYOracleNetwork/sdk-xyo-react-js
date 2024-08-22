import { usePromise } from '@xylabs/react-promise'
import { NodeProvider } from '@xyo-network/react-node-provider'
import type { PropsWithChildren } from 'react'
import React from 'react'

import { buildManifestNodes } from '../lib/index.ts'
import type { CreatablePackageManifest } from '../types/index.ts'

export interface ManifestNodeProviderProps extends PropsWithChildren {
  manifestNodes?: CreatablePackageManifest[]
}

export const ManifestNodeProvider: React.FC<ManifestNodeProviderProps> = ({ children, manifestNodes }) => {
  const [indexedResultsNode] = usePromise(async () => await buildManifestNodes(manifestNodes), [manifestNodes])

  return <NodeProvider node={indexedResultsNode}>{children}</NodeProvider>
}
