import type {
  Payload, Sequence, WithStorageMeta,
} from '@xyo-network/payload-model'
import { useCallback, useState } from 'react'

export const useTotalPayloads = () => {
  /**
   * A list of payloads
   * NOTE: it is designed to be a stable reference where new items are added to the end of the existing array
   */
  const [totalPayloads, setTotalPayloads] = useState<WithStorageMeta<Payload>[] | undefined>([])

  /**
   * A hash used as a cursor to fetch the next page of payloads
   */
  const [cursor, setCursor] = useState<Sequence>()

  const updateTotalPayloads = useCallback((additionalPayloads?: WithStorageMeta<Payload>[]) => {
    if (additionalPayloads && additionalPayloads.length > 0) {
      setTotalPayloads((previous) => {
        if (previous) {
          // Add the new payloads to the end of the existing array
          previous?.push(...additionalPayloads)
          setTotalPayloadsCount(previous?.length)
        }
        // Always return the previous reference to prevent unnecessary renders
        return previous
      })
    }
    return true
  }, [])

  /**
   * The total number of payloads
   * NOTE: this property is meant to change when the total number of payloads changes
   * Components should react to this change and not the array reference of totalPayloads
   */
  const [totalPayloadsCount, setTotalPayloadsCount] = useState(0)

  const updateTotalPayloadsCount = useCallback((count: number) => {
    setTotalPayloadsCount(count)
  }, [])

  const updateCursor = useCallback((newCursor?: Sequence) => {
    setCursor(newCursor)
  }, [])

  const onNext = () => {
    const lastItem = totalPayloads?.at(-1)
    if (lastItem) {
      updateCursor(lastItem._sequence)
    }
  }

  return {
    cursor, onNext, totalPayloads, totalPayloadsCount, updateCursor, updateTotalPayloads, updateTotalPayloadsCount,
  }
}
