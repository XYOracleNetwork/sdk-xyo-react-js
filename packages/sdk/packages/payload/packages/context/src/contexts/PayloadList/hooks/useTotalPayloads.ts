import type { Payload, WithStorageMeta } from '@xyo-network/payload-model'
import { useCallback, useState } from 'react'

export const useTotalPayloads = () => {
  /**
   * A list of payloads
   * NOTE: it is designed to be a stable reference where new items are added to the end of the existing array
   */
  const [totalPayloads, setTotalPayloads] = useState<WithStorageMeta<Payload>[] | undefined>([])

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

  return {
    totalPayloads, totalPayloadsCount, updateTotalPayloads, updateTotalPayloadsCount,
  }
}
