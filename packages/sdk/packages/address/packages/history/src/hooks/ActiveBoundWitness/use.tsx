import { useContextEx } from '@xyo-network/react-shared'

import { ActiveBoundWitnessContext } from '../../contexts/index.js'

export const useActiveBoundWitness = (required?: boolean) => useContextEx(ActiveBoundWitnessContext, 'ActiveBoundWitness', required)
