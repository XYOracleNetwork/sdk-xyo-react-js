import { WithChildren } from '@xylabs/react-shared'
import { useState } from 'react'

import { NestedBoundWitnessesContext } from '../../contexts/index.js'

export const NestedBoundWitnessesProvider: React.FC<WithChildren> = ({ children }) => {
  const [loading, setLoading] = useState(false)
  const [clickedExistingHash, setClickedExistingHash] = useState<string>()

  return (
    <NestedBoundWitnessesContext.Provider value={{ clickedExistingHash, loading, provided: true, setClickedExistingHash, setLoading }}>
      {children}
    </NestedBoundWitnessesContext.Provider>
  )
}
