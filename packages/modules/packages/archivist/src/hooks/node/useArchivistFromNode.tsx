import { ArchivistModule } from '@xyo-network/archivist'
import { Logger } from '@xyo-network/core'
import { ModuleFilter } from '@xyo-network/module'
import { useModuleFromNode } from '@xyo-network/react-node'
import { WalletInstance } from '@xyo-network/wallet-model'

export const useArchivistFromNode = (nameOrAddressOrFilter?: string | ModuleFilter, wallet?: WalletInstance, logger?: Logger) =>
  useModuleFromNode<ArchivistModule>(nameOrAddressOrFilter, wallet, logger)
