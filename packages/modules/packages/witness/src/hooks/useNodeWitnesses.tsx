import { WrappedNodeModulesHookFactory } from '@xyo-network/react-node'
import { WitnessWrapper } from '@xyo-network/witness'

export const useNodeWitnesses = WrappedNodeModulesHookFactory(WitnessWrapper, 'useWitnesses')
