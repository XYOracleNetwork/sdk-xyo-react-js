import { Logger } from '@xyo-network/core'
import { ModuleFilter } from '@xyo-network/module'
import { useModulesFromNode } from '@xyo-network/react-node'
import { WalletInstance } from '@xyo-network/wallet-model'
import { WitnessModule } from '@xyo-network/witness'

export const useWitnessesFromNode = (filter?: ModuleFilter, wallet?: WalletInstance, logger?: Logger) =>
  useModulesFromNode<WitnessModule>(filter, wallet, logger)
