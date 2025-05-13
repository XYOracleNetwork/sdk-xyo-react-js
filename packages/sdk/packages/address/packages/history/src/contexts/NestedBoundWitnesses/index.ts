import type { ContextExState } from '@xylabs/react-shared'
import { createContextEx } from '@xylabs/react-shared'
import type { Dispatch, SetStateAction } from 'react'

export type NestedBoundWitnessesState = ContextExState<{
  clickedExistingHash?: string
  loading?: boolean
  setClickedExistingHash?: Dispatch<SetStateAction<string | undefined>>
  setLoading?: Dispatch<SetStateAction<boolean>>
}>

export const NestedBoundWitnessesContext = createContextEx<NestedBoundWitnessesState>()
