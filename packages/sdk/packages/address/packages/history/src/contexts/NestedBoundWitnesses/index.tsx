import { ContextExState, createContextEx } from '@xyo-network/react-shared'
import { Dispatch, SetStateAction } from 'react'

export interface NestedBoundWitnessesState extends ContextExState {
  loading?: boolean
  setLoading?: Dispatch<SetStateAction<boolean>>
  clickedExistingHash?: string
  setClickedExistingHash?: Dispatch<SetStateAction<string | undefined>>
}

export const NestedBoundWitnessesContext = createContextEx<NestedBoundWitnessesState>()
