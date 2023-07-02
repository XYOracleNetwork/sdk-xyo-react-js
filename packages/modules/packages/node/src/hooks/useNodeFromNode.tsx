import { Logger } from '@xyo-network/core'
import { ModuleFilter } from '@xyo-network/module'
import { NodeModule } from '@xyo-network/node'
import { WalletInstance } from '@xyo-network/wallet-model'

import { useModuleFromNode } from './useModuleFromNode'

export const useNodeFromNode = (nameOrAddressOrFilter?: string | ModuleFilter, wallet?: WalletInstance, logger?: Logger) =>
  useModuleFromNode<NodeModule>(nameOrAddressOrFilter, wallet, logger)
