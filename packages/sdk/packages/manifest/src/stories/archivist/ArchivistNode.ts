import { GenericPayloadDiviner } from '@xyo-network/diviner-payload-generic'
import type { PackageManifestPayload } from '@xyo-network/manifest'
import type { ModuleFactoryLocator } from '@xyo-network/module-factory-locator'

import type { CreatablePackageManifest } from '../../types/index.ts'
import archivistManifest from './archivist-manifest.json' with { type: 'json' }

export const ArchivistManifestNode: CreatablePackageManifest = (locator: ModuleFactoryLocator): PackageManifestPayload => {
  locator.register(GenericPayloadDiviner.factory())

  return archivistManifest as unknown as PackageManifestPayload
}
