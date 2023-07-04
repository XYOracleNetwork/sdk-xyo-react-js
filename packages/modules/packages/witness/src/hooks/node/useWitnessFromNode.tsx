import { Logger } from '@xyo-network/core'
import { useModuleFromNode } from '@xyo-network/react-node'
import { WitnessModule } from '@xyo-network/witness'

export const useWitnessFromNode = (nameOrAddress?: string, up = false, logger?: Logger) => useModuleFromNode<WitnessModule>(nameOrAddress, up, logger)
