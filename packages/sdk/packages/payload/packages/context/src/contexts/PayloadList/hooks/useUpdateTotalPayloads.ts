import type {
  Payload, Sequence, WithStorageMeta,
} from '@xyo-network/payload-model'
import { useEffect, useMemo } from 'react'

import { UpdateTotalPayloadsConditions } from '../lib/index.ts'
import type { PayloadListState } from '../State.ts'

/** Update the reference for totalPayloads based off certain conditions */
export const useUpdateTotalPayloads = (
  newPayloads?: WithStorageMeta<Payload>[],
  cursor?: Sequence,
  totalPayloads?: WithStorageMeta<Payload>[],
  updateTotalPayloads?: PayloadListState['updateTotalPayloads'],
) => {
  const { fromScratch, mergeWithExistingPayloads } = UpdateTotalPayloadsConditions

  // get the last sequence of the new payloads whenever they come in
  const isNewLastPayload = useMemo(
    () => {
      const lastPayload = newPayloads?.at(-1)
      if (lastPayload) {
        const lastSequence = lastPayload._sequence
        // check if the last hash is different from the offset
        return cursor && (lastSequence ? lastSequence !== cursor : undefined)
      }
    },
    [newPayloads, cursor],
  )

  useEffect(() => {
    if (fromScratch(newPayloads, totalPayloads)) {
      updateTotalPayloads?.(newPayloads)
    }
  }, [newPayloads, totalPayloads, updateTotalPayloads])

  useEffect(() => {
    if (mergeWithExistingPayloads(isNewLastPayload, newPayloads)) {
      updateTotalPayloads?.(newPayloads)
    }
  }, [isNewLastPayload, newPayloads])

  return { isNewLastPayload }
}
