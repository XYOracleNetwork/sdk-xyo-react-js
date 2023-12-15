import { MemoryBoundWitnessDiviner } from '@xyo-network/diviner-boundwitness-memory'
import { MemoryPayloadDiviner } from '@xyo-network/diviner-payload-memory'
import { PackageManifestPayload } from '@xyo-network/manifest'
import { ModuleFactoryLocator } from '@xyo-network/module-model'
import { CreatablePackageManifest } from '@xyo-network/react-manifest'

import tokenNodeManifest from './token-node.json'

export const TokenManifestNode: CreatablePackageManifest = (locator: ModuleFactoryLocator): PackageManifestPayload => {
  locator.register(MemoryBoundWitnessDiviner)
  locator.register(MemoryPayloadDiviner)

  return tokenNodeManifest as PackageManifestPayload
}
