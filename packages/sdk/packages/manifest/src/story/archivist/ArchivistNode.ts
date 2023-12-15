import { MemoryPayloadDiviner } from '@xyo-network/diviner-payload-memory'
import { PackageManifestPayload } from '@xyo-network/manifest'
import { ModuleFactoryLocator } from '@xyo-network/module-model'

import { CreatablePackageManifest } from '../../types'
import archivistManifest from './archivist-manifest.json'

export const ArchivistManifestNode: CreatablePackageManifest = (locator: ModuleFactoryLocator): PackageManifestPayload => {
  locator.register(MemoryPayloadDiviner)

  return archivistManifest as PackageManifestPayload
}
