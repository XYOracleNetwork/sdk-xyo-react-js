import { Logger } from '@xyo-network/core'
import { ModuleFilter } from '@xyo-network/module'
import { NodeModule } from '@xyo-network/node'
import { WalletInstance } from '@xyo-network/wallet-model'

import { useModulesFromNode } from './useModulesFromNode'

export const useNodesFromNode = (filter?: ModuleFilter, wallet?: WalletInstance, logger?: Logger) =>
  useModulesFromNode<NodeModule>(filter, wallet, logger)
