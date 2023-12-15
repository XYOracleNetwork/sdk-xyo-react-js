import { ManifestNodeBuilder } from '../classes'
import { CreatablePackageManifest } from '../types'

export const buildManifestNodes = async (manifestNodes?: CreatablePackageManifest[]) => {
  // extract to function to make useful outside of the node provider
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
}
