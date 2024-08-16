import type { AccountInstance } from '@xyo-network/account-model'
import type { ArchivistModule } from '@xyo-network/archivist-model'
import { asArchivistInstance } from '@xyo-network/archivist-model'
import type { StorageArchivistConfig } from '@xyo-network/archivist-storage'
import { StorageArchivist, StorageArchivistConfigSchema } from '@xyo-network/archivist-storage'
import type { MemoryNode } from '@xyo-network/node-memory'
import { asNodeInstance } from '@xyo-network/node-model'
import { assertDefinedEx } from '@xyo-network/react-shared'

export interface ArchivistBuilderConfig {
  name?: string
  namespace?: string
}
export class StorageArchivistBuilder {
  private _archivist: StorageArchivist | undefined
  private remoteArchivist: ArchivistModule | undefined

  protected constructor(
    private config: ArchivistBuilderConfig,
    private account: AccountInstance,
    private node?: MemoryNode,
  ) {}

  get archivist() {
    return assertDefinedEx(this._archivist, 'archivist was not defined upon create')
  }

  static async create(config: ArchivistBuilderConfig, account: AccountInstance, node: MemoryNode): Promise<StorageArchivistBuilder> {
    const instance = new this(config, account, node)
    instance.remoteArchivist = await instance.findParentArchivist()
    instance._archivist = await instance.buildArchivist()
    return instance
  }

  async buildArchivist() {
    const config = this.buildConfig()
    return (await StorageArchivist.create({ account: this.account, config })) as StorageArchivist
  }

  buildConfig(): StorageArchivistConfig {
    return {
      name: this.config.name,
      namespace: this.config.namespace,
      parents: {
        commit: this.remoteArchivist ? [this.remoteArchivist?.address] : undefined,
        read: this.remoteArchivist ? [this.remoteArchivist?.address] : undefined,
      },
      schema: StorageArchivistConfigSchema,
      storeParentReads: true,
      type: 'local',
    }
  }

  async findParentArchivist() {
    const node = asNodeInstance(this.node, 'node not defined')
    const [bridge] = (await node.resolve({ name: ['RemoteNodeBridge'] })) ?? []
    if (bridge) {
      try {
        const [archivist] = (await bridge.resolve({ name: ['Archivist'] })) ?? []
        return asArchivistInstance(archivist)
      } catch {
        console.error('Error Resolving Parent Archivist', this.node?.config.name, this.config)
      }
    }
  }
}
