import { MemoryPayloadDiviner } from '@xyo-network/diviner-payload-memory'
import { PackageManifestPayload } from '@xyo-network/manifest'
import { ModuleFactoryLocator } from '@xyo-network/module-factory-locator'

import { CreatablePackageManifest } from '../../types'
import archivistManifest from './archivist-manifest.json'

export const ArchivistManifestNode: CreatablePackageManifest = (locator: ModuleFactoryLocator): PackageManifestPayload => {
  locator.register(MemoryPayloadDiviner)

  return archivistManifest as PackageManifestPayload
}
