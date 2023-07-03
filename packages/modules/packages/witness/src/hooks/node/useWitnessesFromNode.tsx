import { Logger } from '@xyo-network/core'
import { ModuleFilter } from '@xyo-network/module'
import { useModulesFromNode } from '@xyo-network/react-node'
import { WitnessModule } from '@xyo-network/witness'

export const useWitnessesFromNode = (filter?: ModuleFilter, logger?: Logger) => useModulesFromNode<WitnessModule>(filter, logger)
