import type { ContextExState } from '@xyo-network/react-shared'
import { createContextEx } from '@xyo-network/react-shared'
import type { Dispatch, SetStateAction } from 'react'

export interface NestedBoundWitnessesState extends ContextExState {
  clickedExistingHash?: string
  loading?: boolean
  setClickedExistingHash?: Dispatch<SetStateAction<string | undefined>>
  setLoading?: Dispatch<SetStateAction<boolean>>
}

export const NestedBoundWitnessesContext = createContextEx<NestedBoundWitnessesState>()
