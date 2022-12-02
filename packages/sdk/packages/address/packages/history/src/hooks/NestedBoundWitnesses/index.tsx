import { useContextEx } from '@xyo-network/react-shared'

import { NestedBoundWitnessesContext } from '../../contexts'

export const useNestedBoundWitnesses = (required = false) => useContextEx(NestedBoundWitnessesContext, 'NestedBoundWitnesses', required)
