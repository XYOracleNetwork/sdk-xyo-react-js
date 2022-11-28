import { useMounted, WithChildren } from '@xylabs/react-shared'
import { XyoBoundWitness } from '@xyo-network/boundwitness'
import { PayloadWrapper } from '@xyo-network/payload'
import { useArchivist } from '@xyo-network/react-archivist'
import { ContextExProviderProps } from '@xyo-network/react-shared'
import { useCallback, useEffect, useState } from 'react'

import { useActiveBoundWitness } from '../ActiveBoundWitness'
import { HashSelectionHistoryContext } from './Context'
import { NestedBoundWitnesses } from './State'

export interface HashSelectionHistoryProviderProps extends WithChildren, ContextExProviderProps {
  defaultHashSelectionHistory?: string[]
  defaultNestedBoundWitnesses?: NestedBoundWitnesses
}

export const HashSelectionHistoryProvider: React.FC<HashSelectionHistoryProviderProps> = ({
  children,
  defaultHashSelectionHistory = [],
  defaultNestedBoundWitnesses = {},
  required = true,
}) => {
  const { activeBoundWitness } = useActiveBoundWitness(false)
  const { archivist } = useArchivist(required)
  const mounted = useMounted()
  const [hashSelectionHistory, setHashSelectionHistory] = useState<string[]>(defaultHashSelectionHistory)
  const [nestedBoundWitnesses, setNestedBoundWitnesses] = useState<NestedBoundWitnesses>(defaultNestedBoundWitnesses)

  const clearHistory = useCallback(() => {
    setHashSelectionHistory([])
    setNestedBoundWitnesses({})
    return true
  }, [])

  useEffect(() => {
    if (activeBoundWitness) {
      clearHistory()
    }
  }, [activeBoundWitness, clearHistory])

  const addSelection = async (boundwitness?: XyoBoundWitness) => {
    if (archivist === undefined || boundwitness === undefined) {
      return null
    }
    const { hash } = new PayloadWrapper(boundwitness)
    if (hashSelectionHistory.includes(hash)) {
      return null
    }
    const result = (await archivist.insert([boundwitness]))?.[0]
    if (result && mounted()) {
      setNestedBoundWitnesses((value) => ({
        ...value,
        [hash]: boundwitness,
      }))
      setHashSelectionHistory((previous) => [hash, ...previous])
      return result as XyoBoundWitness
    }
    return null
  }

  const fetchFromHash = async (hash?: string) => {
    if (archivist === undefined || hash === undefined) {
      return null
    }
    const [result] = await archivist.get([hash])
    return result as XyoBoundWitness
  }

  return (
    <HashSelectionHistoryContext.Provider
      value={{
        addSelection,
        clearHistory,
        fetchFromHash,
        hashSelectionHistory,
        nestedBoundWitnesses,
        provided: true,
      }}
    >
      {children}
    </HashSelectionHistoryContext.Provider>
  )
}
