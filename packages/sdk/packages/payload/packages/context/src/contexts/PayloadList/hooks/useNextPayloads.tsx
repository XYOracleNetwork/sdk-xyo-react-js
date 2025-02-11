import { useAsyncEffect } from '@xylabs/react-async-effect'
import type { ArchivistInstance, NextOptions } from '@xyo-network/archivist-model'
import type { Payload, WithStorageMeta } from '@xyo-network/payload-model'
import { useMemo, useState } from 'react'

import type { PayloadListState } from '../State.ts'
import { useUpdateTotalPayloads } from './useUpdateTotalPayloads.ts'

export const useNextPayloads = (
  updateLoading?: (loading: boolean) => void,
  totalPayloads?: WithStorageMeta<Payload>[],
  updateTotalPayloads?: PayloadListState['updateTotalPayloads'],
  clearPayloads = 0,
  archivistInstance?: ArchivistInstance,
  nextOptions?: NextOptions,
) => {
  const [newPayloads, setNewPayloads] = useState<WithStorageMeta<Payload>[]>()
  const [error, setError] = useState<Error>()
  const [fetchMore, setFetchMore] = useState(true)

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
        updateLoading?.(true)
        try {
          const payloads = await archivistInstance.next(nextOptions)
          setNewPayloads(payloads)
          setError(undefined)
          setFetchMore(false)
          updateLoading?.(false)
        } catch (e) {
          setError(e as Error)
          setNewPayloads(undefined)
          setFetchMore(false)
          updateLoading?.(false)
        }
      }
    },
    [archivistInstance, fetchMore, nextOptions],
  )

  useUpdateTotalPayloads(newPayloads, nextOptions?.cursor, totalPayloads, updateTotalPayloads)

  return {
    fetchMorePayloads: () => setFetchMore(true), newPayloads, error,
  }
}
