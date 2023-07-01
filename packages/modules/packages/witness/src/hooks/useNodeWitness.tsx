import { WrappedNodeModuleHookFactory } from '@xyo-network/react-node'
import { WitnessWrapper } from '@xyo-network/witness'

export const useNodeWitness = WrappedNodeModuleHookFactory(WitnessWrapper, 'useNodeWitness')
