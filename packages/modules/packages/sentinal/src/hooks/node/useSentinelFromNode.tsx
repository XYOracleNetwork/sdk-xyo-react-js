import { Logger } from '@xyo-network/core'
import { ModuleFilter } from '@xyo-network/module'
import { useModuleFromNode } from '@xyo-network/react-node'
import { SentinelModule } from '@xyo-network/sentinel'
import { WalletInstance } from '@xyo-network/wallet-model'

export const useSentinelFromNode = (nameOrAddressOrFilter?: string | ModuleFilter, wallet?: WalletInstance, logger?: Logger) =>
  useModuleFromNode<SentinelModule>(nameOrAddressOrFilter, wallet, logger)
