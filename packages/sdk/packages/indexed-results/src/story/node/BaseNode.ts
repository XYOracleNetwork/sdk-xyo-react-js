import { HDWallet } from '@xyo-network/account'
import { MemoryPayloadDiviner } from '@xyo-network/diviner-payload-memory'
import { ManifestWrapper, PackageManifest, PackageManifestPayload } from '@xyo-network/manifest'
import { ModuleFactoryLocator } from '@xyo-network/module'
import { TimestampWitness } from '@xyo-network/witness-timestamp'

import { AddDayDiviner } from './diviners'
import { archivistManifest } from './manifests'

export const BaseNode = async (publicChildren?: PackageManifestPayload[]) => {
  const locator = new ModuleFactoryLocator()
  locator.register(TimestampWitness)
  locator.register(AddDayDiviner)
  locator.register(MemoryPayloadDiviner)

  const wallet = await HDWallet.random()
  const manifest = new ManifestWrapper(archivistManifest as PackageManifest, wallet, locator, publicChildren)

  const [node] = await manifest.loadNodes()
  return node
}
