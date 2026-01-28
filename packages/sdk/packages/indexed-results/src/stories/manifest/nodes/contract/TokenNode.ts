import { MemoryBoundWitnessDiviner } from '@xyo-network/diviner-boundwitness-memory'
import { GenericPayloadDiviner } from '@xyo-network/diviner-payload-generic'
import type { PackageManifestPayload } from '@xyo-network/manifest'
import type { ModuleFactoryLocator } from '@xyo-network/module-factory-locator'
import type { CreatablePackageManifest } from '@xyo-network/react-manifest'

import tokenNodeManifest from './token-node.json' with { type: 'json' }

export const TokenManifestNode: CreatablePackageManifest = (locator: ModuleFactoryLocator): PackageManifestPayload => {
  locator.register(MemoryBoundWitnessDiviner.factory())
  locator.register(GenericPayloadDiviner.factory())

  return tokenNodeManifest as unknown as PackageManifestPayload
}
