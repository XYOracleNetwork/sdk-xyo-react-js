import type { PackageManifestPayload } from '@xyo-network/manifest'
import type { ModuleFactoryLocator } from '@xyo-network/module-factory-locator'
import { TimestampWitness } from '@xyo-network/witness-timestamp'

import type { CreatablePackageManifest } from '../../types/index.ts'
import { AddDayDiviner } from '../modules/index.ts'
import sentinelManifest from './sentinel-manifest.json' with { type: 'json' }

export const SentinelManifestNode: CreatablePackageManifest = (locator: ModuleFactoryLocator): PackageManifestPayload => {
  locator.register(TimestampWitness.factory())
  locator.register(AddDayDiviner.factory())

  return sentinelManifest as PackageManifestPayload
}
