import { WrappedModuleFromNodeHookFactory } from '@xyo-network/react-node'
import { WitnessWrapper } from '@xyo-network/witness'

export const useWrappedWitnessFromNode = WrappedModuleFromNodeHookFactory.create(WitnessWrapper, 'useWrappedWitnessFromNode')
