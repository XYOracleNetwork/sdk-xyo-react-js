import type { PropsWithChildren } from 'react'
import React, { useState } from 'react'

import { NestedBoundWitnessesContext } from '../../contexts/index.ts'

export const NestedBoundWitnessesProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [loading, setLoading] = useState(false)
  const [clickedExistingHash, setClickedExistingHash] = useState<string>()

  return (
    // eslint-disable-next-line @eslint-react/no-unstable-context-value
    <NestedBoundWitnessesContext value={{
      clickedExistingHash, loading, provided: true, setClickedExistingHash, setLoading,
    }}
    >
      {children}
    </NestedBoundWitnessesContext>
  )
}
