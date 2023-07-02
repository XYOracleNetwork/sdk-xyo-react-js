import { Logger } from '@xyo-network/core'
import { DivinerModule } from '@xyo-network/diviner'
import { ModuleFilter } from '@xyo-network/module'
import { useModulesFromNode } from '@xyo-network/react-node'
import { WalletInstance } from '@xyo-network/wallet-model'

export const useDivinersFromNode = (filter?: ModuleFilter, wallet?: WalletInstance, logger?: Logger) =>
  useModulesFromNode<DivinerModule>(filter, wallet, logger)
