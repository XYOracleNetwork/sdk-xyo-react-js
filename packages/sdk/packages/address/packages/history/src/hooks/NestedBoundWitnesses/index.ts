import { useContextEx } from '@xylabs/react-shared'

import { NestedBoundWitnessesContext } from '../../contexts/index.ts'

export const useNestedBoundWitnesses = (required = false) => useContextEx(NestedBoundWitnessesContext, 'NestedBoundWitnesses', required)
