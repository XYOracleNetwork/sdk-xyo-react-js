import { MemoryPayloadDiviner } from '@xyo-network/diviner-payload-memory'
import type { PackageManifestPayload } from '@xyo-network/manifest'
import type { ModuleFactoryLocator } from '@xyo-network/module-factory-locator'

import type { CreatablePackageManifest } from '../../types/index.ts'
import archivistManifest from './archivist-manifest.json' assert { type: 'json' }

export const ArchivistManifestNode: CreatablePackageManifest = (locator: ModuleFactoryLocator): PackageManifestPayload => {
  locator.register(MemoryPayloadDiviner)

  return archivistManifest as PackageManifestPayload
}
