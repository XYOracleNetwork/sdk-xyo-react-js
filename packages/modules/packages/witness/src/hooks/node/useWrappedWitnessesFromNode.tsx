import { WrappedModulesFromNodeHookFactory } from '@xyo-network/react-node'
import { WitnessWrapper } from '@xyo-network/witness'

export const useWrappedWitnessesFromNode = WrappedModulesFromNodeHookFactory.create(WitnessWrapper, 'useWrappedWitnessesFromNode')
