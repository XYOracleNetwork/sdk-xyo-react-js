import { AccountInstance } from '@xyo-network/account-model'
import { MemoryArchivist, MemoryArchivistConfig, MemoryArchivistConfigSchema } from '@xyo-network/archivist'
import { HttpBridge, HttpBridgeConfigSchema } from '@xyo-network/bridge'
import { Module } from '@xyo-network/module'
import { MemoryNode, NodeConfigSchema, NodeWrapper } from '@xyo-network/node'
import { PayloadSetPluginResolver } from '@xyo-network/payloadset-plugin'
import { assertDefinedEx } from '@xyo-network/react-shared'
import { SentinelConfig } from '@xyo-network/sentinel'
import { WitnessModule } from '@xyo-network/witness'

import { SentinelBuilder } from './SentinelBuilder'
import { StorageArchivistBuilder } from './StorageArchivistBuilder'

export interface MemoryNodeBuilderConfig {
  name?: string
  node?: MemoryNode
}

export class MemoryNodeBuilder {
  private _node: MemoryNode | undefined
  private _wrappedNode: NodeWrapper | undefined

  get node() {
    return assertDefinedEx(this._node, 'this._node was not defined upon create')
  }

  static async create({ name, node }: MemoryNodeBuilderConfig, account?: AccountInstance): Promise<MemoryNodeBuilder> {
    const instance = new this()

    const memoryNode: MemoryNode = node ?? (await MemoryNode.create({ account, config: { name, schema: NodeConfigSchema } }))
    instance._node = memoryNode
    return instance
  }

  /** @deprecated - call specific method that corresponds to a type of archivist (i.e. addArchivistStorage) */
  async addArchivist(account: AccountInstance, moduleName?: string, namespace?: string) {
    await this.addArchivistStorage(account, moduleName, namespace)
  }

  async addArchivistMemory(moduleName?: string, account?: AccountInstance) {
    const config: MemoryArchivistConfig = { name: moduleName, schema: MemoryArchivistConfigSchema }
    const memoryArchivist = await MemoryArchivist.create({ account, config })

    await this.attach(memoryArchivist, true)
  }

  async addArchivistStorage(account: AccountInstance, moduleName?: string, namespace?: string) {
    const config = { name: moduleName, namespace }
    const { archivist } = await StorageArchivistBuilder.create(config, account, this.node)

    await this.attach(archivist, true)
  }

  async addBridge(apiDomain: string, moduleName = 'RemoteNodeBridge', account?: AccountInstance) {
    try {
      const bridge = await HttpBridge.create({
        account,
        config: { name: moduleName, nodeUrl: `${apiDomain}/node`, schema: HttpBridgeConfigSchema, security: { allowAnonymous: true } },
      })
      await this.attach(bridge, true)
    } catch (e) {
      console.error('Error Creating Bridge', e)
    }
  }

  async addSentinel(config: SentinelConfig, account: AccountInstance) {
    const { sentinel } = await SentinelBuilder.create(config, account)
    await this.attach(sentinel, true, true)
    return sentinel
  }

  async addWitnesses(pluginSetResolver: PayloadSetPluginResolver, witnesses: (() => Promise<WitnessModule>)[] = []) {
    await Promise.all(
      pluginSetResolver.witnesses().map(async (pluginSet, index) => {
        // Pass the prebuilt witness at the same index
        const witness = await witnesses?.[index]?.()
        if (witness) {
          try {
            await this.witnessCleanup(witness)
            await this.node.register(witness)
            await this.node.attach(witness.address, true)
          } catch (e) {
            console.error('Error attaching witness', JSON.stringify(pluginSet, null, 2), e)
          }
        }
      }),
    )
  }

  async attach(module: Module, external?: boolean, safeAttach?: boolean) {
    try {
      if (safeAttach) {
        const existingModule = (await this.node.downResolver.resolve({ address: [module.address] })).pop()
        if (existingModule) {
          await this.node.detach(existingModule.address)
          await this.node.unregister(existingModule)
        }
      }
      await this.node.register(module)
      await this.node.attach(module.address, external)
    } catch (e) {
      throw Error(`Error adding ${module.config.name ?? module.address} to MemoryNode: ${e}`)
    }
  }

  getWrappedNode(account: AccountInstance) {
    this._wrappedNode = this._wrappedNode ?? NodeWrapper.wrap(this.node, account)
    return this._wrappedNode
  }

  private async witnessCleanup(witness: WitnessModule) {
    if (this.node.registered().includes(witness.address)) {
      const [existingWitness] = await this.node.downResolver.resolve({ address: [witness.address] })
      await this.node.unregister(existingWitness)
    }
  }
}
