import { useAsyncEffect } from '@xylabs/react-async-effect'
import type { ArchivistInstance, NextOptions } from '@xyo-network/archivist-model'
import type {
  Payload, Sequence, WithStorageMeta,
} from '@xyo-network/payload-model'
import type { Dispatch, SetStateAction } from 'react'
import { useMemo, useState } from 'react'

import type { PayloadListState } from '../State.ts'
import { useUpdateTotalPayloads } from './useUpdateTotalPayloads.ts'

export const useNextPayloads = (
  setLoading?: Dispatch<SetStateAction<boolean>>,
  cursor?: Sequence,
  totalPayloads?: WithStorageMeta<Payload>[],
  updateTotalPayloads?: PayloadListState['updateTotalPayloads'],
  clearPayloads = 0,
  limit = 100,
  archivistInstance?: ArchivistInstance,
) => {
  const [newPayloads, setNewPayloads] = useState<WithStorageMeta<Payload>[]>()
  const [error, setError] = useState<Error>()
  const [fetchMore, setFetchMore] = useState(true)

  const nextOptions = useMemo<NextOptions>(() => ({ limit, cursor }), [limit, cursor])

  useMemo(() => {
    if (clearPayloads) {
      setError(undefined)
      setNewPayloads(undefined)
      setFetchMore(true)
    }
  }, [clearPayloads])

  useAsyncEffect(
    async () => {
      if (archivistInstance && fetchMore) {
        setLoading?.(true)
        try {
          const payloads = await archivistInstance.next(nextOptions)
          setNewPayloads(payloads)
          setError(undefined)
          setFetchMore(false)
          setLoading?.(false)
        } catch (e) {
          setError(e as Error)
          setNewPayloads(undefined)
          setFetchMore(false)
          setLoading?.(false)
        }
      }
    },
    [archivistInstance, fetchMore, nextOptions],
  )

  useUpdateTotalPayloads(newPayloads, cursor, totalPayloads, updateTotalPayloads)

  return {
    fetchMorePayloads: () => setFetchMore(true), newPayloads, error,
  }
}
