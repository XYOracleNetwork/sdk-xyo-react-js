import { AccountInstance } from '@xyo-network/account-model'
import { ArchivistModule, StorageArchivist, StorageArchivistConfig, StorageArchivistConfigSchema } from '@xyo-network/archivist'
import { MemoryNode, NodeWrapper } from '@xyo-network/node'
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
    const wrappedNode = NodeWrapper.wrap(assertDefinedEx(this.node, 'node not defined'), this.account)
    const [bridge] = (await wrappedNode.resolve({ name: ['RemoteNodeBridge'] })) ?? []
    if (bridge) {
      try {
        const [archivist] = (await bridge.resolve({ name: ['Archivist'] })) ?? []
        return archivist as ArchivistModule
      } catch (e) {
        console.error('Error Resolving Parent Archivist', this.node?.config.name, this.config)
      }
    }
  }
}
