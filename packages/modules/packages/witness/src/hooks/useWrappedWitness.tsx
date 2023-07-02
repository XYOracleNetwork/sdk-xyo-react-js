import { WrappedModuleHookFactory } from '@xyo-network/react-module'
import { WitnessWrapper } from '@xyo-network/witness'

export const useWrappedWitness = WrappedModuleHookFactory.create(WitnessWrapper)
