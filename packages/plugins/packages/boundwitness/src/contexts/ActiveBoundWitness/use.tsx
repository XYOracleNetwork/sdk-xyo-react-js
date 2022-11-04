import { useContextEx } from '@xyo-network/react-shared'

import { ActiveBoundWitnessContext } from './Context'

export const useActiveBoundWitness = (required?: boolean) => useContextEx(ActiveBoundWitnessContext, 'ActiveBoundWitness', required)
