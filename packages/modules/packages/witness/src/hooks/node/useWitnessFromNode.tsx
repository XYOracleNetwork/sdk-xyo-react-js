import { Logger } from '@xyo-network/core'
import { ModuleFilter } from '@xyo-network/module'
import { useModuleFromNode } from '@xyo-network/react-node'
import { WitnessModule } from '@xyo-network/witness'

export const useWitnessFromNode = (nameOrAddressOrFilter?: string | ModuleFilter, logger?: Logger) =>
  useModuleFromNode<WitnessModule>(nameOrAddressOrFilter, logger)