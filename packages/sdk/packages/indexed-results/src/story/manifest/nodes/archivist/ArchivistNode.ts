import { MemoryPayloadDiviner } from '@xyo-network/diviner-payload-memory'
import { PackageManifestPayload } from '@xyo-network/manifest'
import { ModuleFactoryLocator } from '@xyo-network/module'

import { CreatablePackageManifest } from '../../lib'
import archivistManifest from './archivist-manifest.json'

export const ArchivistManifestNode: CreatablePackageManifest = async (locator: ModuleFactoryLocator): Promise<PackageManifestPayload> => {
  locator.register(MemoryPayloadDiviner)

  return archivistManifest as PackageManifestPayload
}
