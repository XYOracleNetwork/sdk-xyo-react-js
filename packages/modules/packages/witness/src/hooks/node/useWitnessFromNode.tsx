import { Logger } from '@xyo-network/core'
import { ModuleFilter } from '@xyo-network/module'
import { useModuleFromNode } from '@xyo-network/react-node'
import { WalletInstance } from '@xyo-network/wallet-model'
import { WitnessModule } from '@xyo-network/witness'

export const useWitnessFromNode = (nameOrAddressOrFilter?: string | ModuleFilter, wallet?: WalletInstance, logger?: Logger) =>
  useModuleFromNode<WitnessModule>(nameOrAddressOrFilter, wallet, logger)
