import { HDWallet } from "@xyo-network/account";
import { ManifestWrapper, PackageManifestPayload } from "@xyo-network/manifest";
import { ModuleFactoryLocator } from "@xyo-network/module";
import { CreatablePackageManifest } from "../lib";

export class ManifestNodeBuilder {
  locatedManifests: PackageManifestPayload[] = []
  manifestWrapper: ManifestWrapper | undefined

  constructor(private manifestNodes: CreatablePackageManifest[] = [], private wallet?: HDWallet, private locator: ModuleFactoryLocator = new ModuleFactoryLocator(), private topLevelNodeIndex = 0) {
  }

  async create() {
    this.locatedManifests = await Promise.all(this.manifestNodes.map(async (manifestNode) => await manifestNode(this.locator)))
    return this
  }

  async loadNodes() {
    const wallet = this.wallet ?? await HDWallet.random()
    const topLevelManifestNode = this.locatedManifests[this.topLevelNodeIndex]
    const publicChildren = this.locatedManifests.filter(node => node !== topLevelManifestNode)
    const wrapper = new ManifestWrapper(topLevelManifestNode, wallet, this.locator, publicChildren)

    const [node] = await wrapper.loadNodes()
    return node
  }
}