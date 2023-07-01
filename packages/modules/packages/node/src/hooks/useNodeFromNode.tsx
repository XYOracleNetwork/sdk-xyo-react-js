import { Logger } from '@xyo-network/core'
import { NodeModule } from '@xyo-network/node'
import { WalletInstance } from '@xyo-network/wallet-model'

import { useModuleFromNode } from './useModuleFromNode'

export const useNodeFromNode = (nameOrAddress?: string, account?: WalletInstance, logger?: Logger): [NodeModule | undefined, Error | undefined] => {
  return useModuleFromNode<NodeModule>(nameOrAddress, account, logger)
}
