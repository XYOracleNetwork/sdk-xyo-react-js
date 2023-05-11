import { useAsyncEffect } from '@xylabs/react-async-effect'
import { ArchivistAllQuerySchema, ArchivistModule } from '@xyo-network/archivist'
import { BoundWitnessSchema } from '@xyo-network/boundwitness-model'
import { BoundWitnessWrapper } from '@xyo-network/boundwitness-wrapper'
import { EventUnsubscribeFunction } from '@xyo-network/module'
import { Payload } from '@xyo-network/payload-model'
import { useCallback, useEffect, useMemo, useState } from 'react'

import { ArchivistStats } from './ArchivistStats'

export interface MemoryArchivistStatsProps {
  archivist?: ArchivistModule
}

export const MemoryArchivistsStats: React.FC<MemoryArchivistStatsProps> = ({ archivist }) => {
  const [all, setAll] = useState<Payload[] | null>()

  const getAll = useCallback(async (archivist?: ArchivistModule) => {
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

    return () => listeners.forEach((listener) => listener?.())
  }, [archivist, getAll])

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async () => {
      if (archivist?.queries.includes(ArchivistAllQuerySchema)) {
        await getAll(archivist)
      } else {
        setAll(null)
      }
    },
    [archivist, getAll],
  )

  const payloads = useMemo(() => (all === null ? [] : all?.filter((payload) => payload.schema !== BoundWitnessSchema)), [all])
  const boundWitnesses = useMemo(() => (all === null ? [] : all?.filter((payload) => payload.schema === BoundWitnessSchema)), [all])
  const addresses = useMemo(
    () =>
      all?.reduce((prev, payload) => {
        const w = BoundWitnessWrapper.tryParse(payload) as BoundWitnessWrapper | undefined
        w?.addresses?.forEach((address) => {
          prev[address] = (prev[address] ?? 0) + 1
        })
        return prev
      }, {} as Record<string, number>) ?? {},
    [all],
  )
  const schemas = useMemo(
    () =>
      all?.reduce((prev, payload) => {
        prev[payload.schema] = (prev[payload.schema] ?? 0) + 1
        return prev
      }, {} as Record<string, number>) ?? {},
    [all],
  )

  return <ArchivistStats addresses={addresses} boundWitnesses={boundWitnesses} payloads={payloads} schemas={schemas} />
}
