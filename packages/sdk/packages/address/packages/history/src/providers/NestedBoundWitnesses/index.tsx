import { WithChildren } from '@xylabs/react-shared'
import React, { useState } from 'react'

import { NestedBoundWitnessesContext } from '../../contexts/index.ts'

export const NestedBoundWitnessesProvider: React.FC<WithChildren> = ({ children }) => {
  const [loading, setLoading] = useState(false)
  const [clickedExistingHash, setClickedExistingHash] = useState<string>()

  return (
    // eslint-disable-next-line @eslint-react/no-unstable-context-value
    <NestedBoundWitnessesContext.Provider value={{ clickedExistingHash, loading, provided: true, setClickedExistingHash, setLoading }}>
      {children}
    </NestedBoundWitnessesContext.Provider>
  )
}
