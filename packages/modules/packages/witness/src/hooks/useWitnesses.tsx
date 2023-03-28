import { WrappedModulesHookFactory } from '@xyo-network/react-node'
import { WitnessWrapper } from '@xyo-network/witness'

export const useWitnesses = WrappedModulesHookFactory(WitnessWrapper, 'useWitnesses')
