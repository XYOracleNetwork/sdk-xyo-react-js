import { WithChildren } from '@xylabs/react-shared'
import { ContextExState, createContextEx, useContextEx } from '@xyo-network/react-shared'
import React, { Dispatch, SetStateAction, useState } from 'react'

export interface NestedBoundWitnessesState extends ContextExState {
  loading?: boolean
  setLoading?: Dispatch<SetStateAction<boolean>>
  clickedExistingHash?: string
  setClickedExistingHash?: Dispatch<SetStateAction<string | undefined>>
}

export const NestedBoundWitnessesContext = createContextEx<NestedBoundWitnessesState>()

export const NestedBoundWitnessesProvider: React.FC<WithChildren> = ({ children }) => {
  const [loading, setLoading] = useState(false)
  const [clickedExistingHash, setClickedExistingHash] = useState<string>()

  return (
    <NestedBoundWitnessesContext.Provider value={{ clickedExistingHash, loading, provided: true, setClickedExistingHash, setLoading }}>
      {children}
    </NestedBoundWitnessesContext.Provider>
  )
}

export const useNestedBoundWitnesses = (required = true) => useContextEx(NestedBoundWitnessesContext, 'NestedBoundWitnesses', required)
