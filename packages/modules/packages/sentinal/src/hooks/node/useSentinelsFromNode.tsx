import { Logger } from '@xyo-network/core'
import { ModuleFilter } from '@xyo-network/module'
import { useModulesFromNode } from '@xyo-network/react-node'
import { SentinelModule } from '@xyo-network/sentinel'
import { WalletInstance } from '@xyo-network/wallet-model'

export const useSentinelsFromNode = (filter?: ModuleFilter, wallet?: WalletInstance, logger?: Logger) =>
  useModulesFromNode<SentinelModule>(filter, wallet, logger)
