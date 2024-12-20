import type { Hash } from '@xylabs/hex'
import { useMounted } from '@xylabs/react-shared'
import type { ArchivistInstance } from '@xyo-network/archivist-model'
import type { BoundWitness } from '@xyo-network/boundwitness-model'
import { PayloadBuilder } from '@xyo-network/payload-builder'
import type { ModuleError, WithStorageMeta } from '@xyo-network/payload-model'
import type { ContextExProviderProps } from '@xyo-network/react-shared'
import type { PropsWithChildren } from 'react'
import React, {
  useCallback, useEffect, useState,
} from 'react'

import type { NestedBoundWitnesses } from '../../contexts/index.ts'
import { HashSelectionHistoryContext } from '../../contexts/index.ts'
import { useActiveBoundWitness } from '../../hooks/index.ts'

export interface HashSelectionHistoryProviderProps extends PropsWithChildren, ContextExProviderProps {
  archivist?: ArchivistInstance | null
  defaultHashSelectionHistory?: Hash[]
  defaultNestedBoundWitnesses?: NestedBoundWitnesses
}

export const HashSelectionHistoryProvider: React.FC<HashSelectionHistoryProviderProps> = ({
  archivist,
  children,
  defaultHashSelectionHistory,
  defaultNestedBoundWitnesses,
}) => {
  const { activeBoundWitness } = useActiveBoundWitness(false)
  const mounted = useMounted()
  const [hashSelectionHistory, setHashSelectionHistory] = useState<Hash[]>(defaultHashSelectionHistory ?? [])
  const [nestedBoundWitnesses, setNestedBoundWitnesses] = useState<NestedBoundWitnesses>(defaultNestedBoundWitnesses ?? {})
  const [error, setError] = useState<ModuleError>()

  const clearHistory = useCallback(() => {
    // eslint-disable-next-line @eslint-react/hooks-extra/no-direct-set-state-in-use-effect
    setHashSelectionHistory([])
    // eslint-disable-next-line @eslint-react/hooks-extra/no-direct-set-state-in-use-effect
    setNestedBoundWitnesses({})
    return true
  }, [setHashSelectionHistory, setNestedBoundWitnesses])

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
      return
    }

    const hash = await PayloadBuilder.dataHash(boundwitness)
    if (hashSelectionHistory.includes(hash)) {
      return null
    }
    const result = (await archivist.insert([boundwitness]))?.[0]
    if (result && mounted()) {
      setNestedBoundWitnesses(value => ({
        ...value,
        [hash]: boundwitness,
      }))
      setHashSelectionHistory(previous => [hash, ...previous])
      return result as WithStorageMeta<BoundWitness>
    }
    return null
  }

  const fetchFromHash = async (hash?: Hash) => {
    if (!archivist || !hash) {
      return null
    }
    try {
      const [result] = await archivist.get([hash])
      return result as WithStorageMeta<BoundWitness>
    } catch (e) {
      setError(e as ModuleError)
      return
    }
  }

  return (
    <HashSelectionHistoryContext.Provider
      // eslint-disable-next-line @eslint-react/no-unstable-context-value
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
