import { useContextEx } from '@xylabs/react-shared'

import { ActiveBoundWitnessContext } from '../../contexts/index.ts'

export const useActiveBoundWitness = (required?: boolean) => useContextEx(ActiveBoundWitnessContext, 'ActiveBoundWitness', required)
