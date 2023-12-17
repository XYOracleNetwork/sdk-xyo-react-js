import { HDWallet } from '@xyo-network/account'
import { ManifestWrapper, PackageManifestPayload } from '@xyo-network/manifest'
import { ModuleFactoryLocator } from '@xyo-network/module-model'
import { WalletInstance } from '@xyo-network/wallet-model'

import { CreatablePackageManifest } from '../types'

export class ManifestNodeBuilder {
  locatedManifests: PackageManifestPayload[] = []
  manifestWrapper: ManifestWrapper | undefined

  constructor(
    private manifestNodes: CreatablePackageManifest[] = [],
    private wallet?: WalletInstance,
    private locator: ModuleFactoryLocator = new ModuleFactoryLocator(),
    private topLevelNodeIndex = 0,
  ) {}

  async create() {
    this.locatedManifests = await Promise.all(this.manifestNodes.map((manifestNode) => manifestNode(this.locator)))
    return this
  }

  async loadNodes() {
    const wallet: WalletInstance = this.wallet ?? (await HDWallet.create())
    const topLevelManifestNode = this.locatedManifests[this.topLevelNodeIndex]
    const publicChildren = this.locatedManifests.filter((node) => node !== topLevelManifestNode)
    const wrapper = new ManifestWrapper(topLevelManifestNode, wallet, this.locator, publicChildren)

    const [node] = await wrapper.loadNodes()
    return node
  }
}
