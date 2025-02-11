import { useAsyncEffect } from '@xylabs/react-async-effect'
import type { ArchivistInstance, NextOptions } from '@xyo-network/archivist-model'
import type { Payload, WithStorageMeta } from '@xyo-network/payload-model'
import type { Dispatch, SetStateAction } from 'react'
import { useMemo, useState } from 'react'

import type { PayloadListState } from '../State.ts'
import { useUpdateTotalPayloads } from './useUpdateTotalPayloads.ts'

export const useNextPayloads = (
  setLoading?: Dispatch<SetStateAction<boolean>>,
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

  useUpdateTotalPayloads(newPayloads, nextOptions?.cursor, totalPayloads, updateTotalPayloads)

  return {
    fetchMorePayloads: () => setFetchMore(true), newPayloads, error,
  }
}
