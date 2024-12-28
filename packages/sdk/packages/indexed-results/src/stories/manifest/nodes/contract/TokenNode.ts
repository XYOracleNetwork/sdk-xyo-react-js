import { MemoryBoundWitnessDiviner } from '@xyo-network/diviner-boundwitness-memory'
import { MemoryPayloadDiviner } from '@xyo-network/diviner-payload-memory'
import type { PackageManifestPayload } from '@xyo-network/manifest'
import type { ModuleFactoryLocator } from '@xyo-network/module-factory-locator'
import type { CreatablePackageManifest } from '@xyo-network/react-manifest'

import tokenNodeManifest from './token-node.json' assert { type: 'json' }

export const TokenManifestNode: CreatablePackageManifest = (locator: ModuleFactoryLocator): PackageManifestPayload => {
  locator.register(MemoryBoundWitnessDiviner)
  locator.register(MemoryPayloadDiviner)

  return tokenNodeManifest as PackageManifestPayload
}
