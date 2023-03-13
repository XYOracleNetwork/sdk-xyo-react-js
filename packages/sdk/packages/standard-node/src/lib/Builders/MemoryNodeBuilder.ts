import { AccountInstance } from '@xyo-network/account-model'
import { HttpBridge, HttpBridgeConfigSchema } from '@xyo-network/bridge'
import { Module } from '@xyo-network/module'
import { MemoryNode, NodeConfigSchema, NodeWrapper } from '@xyo-network/node'
import { PayloadSetPluginResolver } from '@xyo-network/payloadset-plugin'
import { assertDefinedEx } from '@xyo-network/react-shared'
import { WitnessModule } from '@xyo-network/witness'

import { SentinelBuilder, SentinelBuilderConfig, SentinelCallbacks } from './SentinelBuilder'
import { StorageArchivistBuilder } from './StorageArchivistBuilder'

interface MemoryNodeBuilderConfig {
  name?: string
  node?: MemoryNode
}

export class MemoryNodeBuilder {
  private _node: MemoryNode | undefined
  private _wrappedNode: NodeWrapper<MemoryNode> | undefined

  get node() {
    return assertDefinedEx(this._node, 'this._node was not defined upon create')
  }

  get wrappedNode() {
    return assertDefinedEx(this._wrappedNode, 'this._wrappedNode was not defined upon create')
  }

  static async create({ name, node }: MemoryNodeBuilderConfig, account?: AccountInstance): Promise<MemoryNodeBuilder> {
    const instance = new this()

    let memoryNode: MemoryNode
    if (node) {
      memoryNode = node
    } else {
      memoryNode = await MemoryNode.create({ account, config: { name, schema: NodeConfigSchema } })
    }
    instance._node = memoryNode
    instance._wrappedNode = NodeWrapper.wrap(memoryNode)
    return instance
  }

  async addArchivist(account: AccountInstance, moduleName: string, namespace: string) {
    const config = { name: moduleName, namespace }
    const { archivist } = await StorageArchivistBuilder.create(config, account, this.node)

    await this.attach(archivist, true)
  }

  async addBridge(apiDomain: string) {
    try {
      const bridge = await HttpBridge.create({
        config: { name: 'RemoteNodeBridge', nodeUri: `${apiDomain}/node`, schema: HttpBridgeConfigSchema, security: { allowAnonymous: true } },
      })
      await this.attach(bridge, true)
    } catch (e) {
      console.error('Error Creating Bridge', e)
    }
  }

  async addSentinel(config: SentinelBuilderConfig, account: AccountInstance, callbacks: SentinelCallbacks) {
    const { sentinel } = await SentinelBuilder.create(config, account, callbacks)
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
            await this.node.register(witness).attach(witness.address, true)
          } catch (e) {
            console.error('Error attaching witness', JSON.stringify(pluginSet, null, 2), e)
          }
        }
      }),
    )
  }

  private async attach(module: Module, external?: boolean, safeAttach?: boolean) {
    try {
      if (safeAttach) {
        const existingModule = await this.wrappedNode.resolve(module.address)
        if (existingModule) {
          await this.node.detach(existingModule.address)
          await this.node.unregister(existingModule)
        }
      }
      this.node.register(module)
      await this.node.attach(module.address, external)
    } catch (e) {
      throw Error(`Error adding ${module.config.name ?? module.address} to MemoryNode: ${e}`)
    }
  }
}
