import { usePromise } from '@xylabs/react-promise'
import { NodeProvider } from '@xyo-network/react-node-provider'
import { PropsWithChildren } from 'react'
import { ManifestNodeBuilder } from './classes'
import { CreatablePackageManifest } from './lib'

export interface ManifestNodeProviderProps extends PropsWithChildren {
  manifestNodes?: CreatablePackageManifest[]
}

export const ManifestNodeProvider: React.FC<ManifestNodeProviderProps> = ({ children, manifestNodes }) => {
  const [indexedResultsNode] = usePromise(async () => {
    try {
      if (manifestNodes) {
        const manifestNodeBuilder = new ManifestNodeBuilder(manifestNodes)
        await manifestNodeBuilder.create()
        return await manifestNodeBuilder.loadNodes()
      }
    } catch (e) {
      console.error('Error creating IndexedResultsNode', e)
      throw e
    }
  }, [])

  return <NodeProvider node={indexedResultsNode}>{children}</NodeProvider>
}
