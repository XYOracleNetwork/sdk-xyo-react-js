import { Logger } from '@xyo-network/core'
import { DivinerModule } from '@xyo-network/diviner'
import { ModuleFilter } from '@xyo-network/module'
import { useModuleFromNode } from '@xyo-network/react-node'
import { WalletInstance } from '@xyo-network/wallet-model'

export const useDivinerFromNode = (nameOrAddressOrFilter?: string | ModuleFilter, wallet?: WalletInstance | null, logger?: Logger) =>
  useModuleFromNode<DivinerModule>(nameOrAddressOrFilter, wallet, logger)
