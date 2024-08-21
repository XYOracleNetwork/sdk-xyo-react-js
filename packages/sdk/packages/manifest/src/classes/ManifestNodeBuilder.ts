import { generateMnemonic } from '@scure/bip39'
// eslint-disable-next-line import-x/no-internal-modules
import { wordlist } from '@scure/bip39/wordlists/english'
import { HDWallet } from '@xyo-network/account'
import type {
  Manifest, ModuleManifest, PackageManifestPayload,
} from '@xyo-network/manifest'
import { ManifestWrapper } from '@xyo-network/manifest'
import { ModuleFactoryLocator } from '@xyo-network/module-factory-locator'
import type { WalletInstance } from '@xyo-network/wallet-model'

import type { CreatablePackageManifest } from '../types/index.ts'

export class ManifestNodeBuilder {
  locatedManifests: Manifest[] = []
  manifestWrapper: ManifestWrapper<void> | undefined

  constructor(
    private manifestNodes: CreatablePackageManifest[] = [],
    private wallet?: WalletInstance,
    private locator: ModuleFactoryLocator = new ModuleFactoryLocator(),
    private topLevelNodeIndex = 0,
  ) {}

  async create() {
    this.locatedManifests = (await Promise.all(this.manifestNodes.map(manifestNode => manifestNode(this.locator).nodes))).flat()
    return this
  }

  async loadNodes() {
    const wallet = this.wallet ?? (await this.randomWallet())
    const topLevelManifestNode = this.locatedManifests[this.topLevelNodeIndex]
    const publicChildren = this.locatedManifests.filter(node => node !== topLevelManifestNode) as ModuleManifest[]
    const wrapper = new ManifestWrapper(topLevelManifestNode as PackageManifestPayload, wallet, this.locator, publicChildren)
    const [node] = await wrapper.loadNodes()
    return node
  }

  async randomWallet() {
    const mnemonic = generateMnemonic(wordlist, 256)
    return await HDWallet.fromPhrase(mnemonic)
  }
}
