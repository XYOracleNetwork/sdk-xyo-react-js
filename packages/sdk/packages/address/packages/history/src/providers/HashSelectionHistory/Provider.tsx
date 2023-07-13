import { useMounted, WithChildren } from '@xylabs/react-shared'
import { ArchivistInstance } from '@xyo-network/archivist'
import { BoundWitness } from '@xyo-network/boundwitness-model'
import { ModuleError } from '@xyo-network/payload-model'
import { PayloadWrapper } from '@xyo-network/payload-wrapper'
import { ContextExProviderProps } from '@xyo-network/react-shared'
import { useCallback, useEffect, useState } from 'react'

import { HashSelectionHistoryContext, NestedBoundWitnesses } from '../../contexts'
import { useActiveBoundWitness } from '../../hooks'

export interface HashSelectionHistoryProviderProps extends WithChildren, ContextExProviderProps {
  archivist?: ArchivistInstance | null
  defaultHashSelectionHistory?: string[]
  defaultNestedBoundWitnesses?: NestedBoundWitnesses
}

export const HashSelectionHistoryProvider: React.FC<HashSelectionHistoryProviderProps> = ({
  archivist,
  children,
  defaultHashSelectionHistory = [],
  defaultNestedBoundWitnesses = {},
}) => {
  const { activeBoundWitness } = useActiveBoundWitness(false)
  const mounted = useMounted()
  const [hashSelectionHistory, setHashSelectionHistory] = useState<string[]>(defaultHashSelectionHistory)
  const [nestedBoundWitnesses, setNestedBoundWitnesses] = useState<NestedBoundWitnesses>(defaultNestedBoundWitnesses)
  const [error, setError] = useState<ModuleError>()

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

  const addSelection = async (boundwitness?: BoundWitness | null) => {
    if (archivist === null || boundwitness === null) {
      return null
    }

    if (archivist === undefined || boundwitness === undefined) {
      return undefined
    }

    const hash = await PayloadWrapper.hashAsync(boundwitness)
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
      return result as BoundWitness
    }
    return null
  }

  const fetchFromHash = async (hash?: string) => {
    if (!archivist || !hash) {
      return null
    }
    try {
      const [result] = await archivist.get([hash])
      return result as BoundWitness
    } catch (e) {
      setError(e as ModuleError)
      return undefined
    }
  }

  return (
    <HashSelectionHistoryContext.Provider
      value={{
        addSelection,
        clearHistory,
        error,
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
