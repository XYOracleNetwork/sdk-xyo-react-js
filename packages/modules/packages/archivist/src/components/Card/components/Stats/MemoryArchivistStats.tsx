import { useAsyncEffect } from '@xylabs/react-async-effect'
import type { ArchivistInstance } from '@xyo-network/archivist-model'
import { ArchivistAllQuerySchema } from '@xyo-network/archivist-model'
import { asBoundWitness, BoundWitnessSchema } from '@xyo-network/boundwitness-model'
import type { EventUnsubscribeFunction } from '@xyo-network/module-events'
import type { Payload } from '@xyo-network/payload-model'
import React, { useCallback, useEffect, useMemo, useState } from 'react'

import { ArchivistStats } from './ArchivistStats.tsx'

export interface MemoryArchivistStatsProps {
  archivist?: ArchivistInstance
}

export const MemoryArchivistsStats: React.FC<MemoryArchivistStatsProps> = ({ archivist }) => {
  const [all, setAll] = useState<Payload[] | null>()

  const getAll = useCallback(async (archivist?: ArchivistInstance) => {
    const all = await archivist?.all?.()
    setAll(all)
  }, [])

  useEffect(() => {
    const listeners: EventUnsubscribeFunction[] = []

    if (archivist?.queries.includes(ArchivistAllQuerySchema)) {
      const insertListener = archivist.on('inserted', async () => {
        await getAll(archivist)
      })
      listeners.push(insertListener)

      const clearListener = archivist.on('cleared', async () => {
        await getAll(archivist)
      })
      listeners.push(clearListener)
    }

    return () => {
      for (const listener of listeners) listener?.()
    }
  }, [archivist, getAll])

  useAsyncEffect(
    async () => {
      if (archivist?.queries.includes(ArchivistAllQuerySchema)) {
        await getAll(archivist)
      } else {
        setAll(null)
      }
    },
    [archivist, getAll],
  )

  const payloads = useMemo(() => (all === null ? [] : all?.filter(payload => payload.schema !== BoundWitnessSchema)), [all])
  const boundWitnesses = useMemo(() => (all === null ? [] : all?.filter(payload => payload.schema === BoundWitnessSchema)), [all])
  const addresses = useMemo(
    () =>
      all?.reduce(
        (prev, payload) => {
          const w = asBoundWitness(payload)
          if (w?.addresses)
            for (const address of w?.addresses ?? []) {
              prev[address] = (prev[address] ?? 0) + 1
            }
          return prev
        },
        {} as Record<string, number>,
      ) ?? {},
    [all],
  )
  const schemas = useMemo(
    () =>
      all?.reduce(
        (prev, payload) => {
          prev[payload.schema] = (prev[payload.schema] ?? 0) + 1
          return prev
        },
        {} as Record<string, number>,
      ) ?? {},
    [all],
  )

  return <ArchivistStats addresses={addresses} boundWitnesses={boundWitnesses} payloads={payloads} schemas={schemas} />
}
