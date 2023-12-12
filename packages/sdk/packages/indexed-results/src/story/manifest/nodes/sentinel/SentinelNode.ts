import { PackageManifestPayload } from '@xyo-network/manifest'
import { ModuleFactoryLocator } from '@xyo-network/module'

import { TimestampWitness } from '@xyo-network/witness-timestamp'
import { CreatablePackageManifest } from '../../lib'
import { AddDayDiviner } from '../../modules'
import sentinelManifest from './sentinel-manifest.json'

export const SentinelManifestNode: CreatablePackageManifest = async (locator: ModuleFactoryLocator): Promise<PackageManifestPayload> => {
  locator.register(TimestampWitness)
  locator.register(AddDayDiviner)

  return sentinelManifest as PackageManifestPayload
}
