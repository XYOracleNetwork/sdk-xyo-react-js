import { ArchivistModule } from '@xyo-network/archivist'
import { Logger } from '@xyo-network/core'
import { ModuleFilter } from '@xyo-network/module'
import { useModulesFromNode } from '@xyo-network/react-node'
import { WalletInstance } from '@xyo-network/wallet-model'

export const useArchivistsFromNode = (filter?: ModuleFilter, wallet?: WalletInstance, logger?: Logger) =>
  useModulesFromNode<ArchivistModule>(filter, wallet, logger)
