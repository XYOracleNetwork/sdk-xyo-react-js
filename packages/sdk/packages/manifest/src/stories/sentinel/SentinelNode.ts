import { PackageManifestPayload } from '@xyo-network/manifest'
import { ModuleFactoryLocator } from '@xyo-network/module-factory-locator'
import { TimestampWitness } from '@xyo-network/witness-timestamp'

import { CreatablePackageManifest } from '../../types'
import { AddDayDiviner } from '../modules'
import sentinelManifest from './sentinel-manifest.json'

export const SentinelManifestNode: CreatablePackageManifest = (locator: ModuleFactoryLocator): PackageManifestPayload => {
  locator.register(TimestampWitness)
  locator.register(AddDayDiviner)

  return sentinelManifest as PackageManifestPayload
}
