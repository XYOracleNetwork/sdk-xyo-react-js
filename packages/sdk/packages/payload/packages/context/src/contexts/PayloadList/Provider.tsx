import type { ArchivistInstance } from '@xyo-network/archivist-model'
import type {
  Payload,
  Sequence,
  WithStorageMeta,
} from '@xyo-network/payload-model'
import { useEvent } from '@xyo-network/react-event'
import type { PaginationNouns } from '@xyo-network/react-payload-table'
import type { PropsWithChildren } from 'react'
import React, {
  useCallback, useMemo, useState,
} from 'react'

import { PayloadListContext } from './Context.tsx'
import { useNextPayloads } from './hooks/index.ts'
import type { PayloadListState } from './State.ts'

type PayloadListProviderProps = PropsWithChildren & { archivist?: ArchivistInstance }

export const PayloadListProvider: React.FC<PayloadListProviderProps> = ({ archivist, children }) => {
  /**
   * A list of payloads
   * NOTE: it is designed to be a stable reference where new items are added to the end of the existing array
   */
  const [totalPayloads, setTotalPayloads] = useState<WithStorageMeta<Payload>[] | undefined>([])

  /**
   * The total number of payloads
   * NOTE: this property is meant to change when the total number of payloads changes
   * Components should react to this change and not the array reference of totalPayloads
   */
  const [totalPayloadsCount, setTotalPayloadsCount] = useState(0)

  /**
   * A hash used as a cursor to fetch the next page of payloads
   */
  const [cursor, setCursor] = useState<Sequence>()

  const [loading, setLoading] = useState(false)
  const [scrollToTop, setScrollTop] = useState(0)
  const [clearNewPayloads, setClearNewPayloads] = useState(0)

  // Context exposes a ref for the table element so the context can react to ui events
  const [scrollRef] = useEvent<HTMLTableElement, PaginationNouns>((noun) => {
    if (scrollRef.current) {
      if ((noun === 'previousPage' || noun === 'nextPage')) {
        // scroll to top of table on each page change
        setScrollTop(previous => previous + 1)
      }
      // if the noun is nextPage, get the last item in totalPayloads and set the cursor to the last item's sequence
      if (noun === 'nextPage') {
        const lastItem = totalPayloads?.at(-1)
        if (lastItem) {
          setCursor(lastItem._sequence)
        }
      }
    }
  })

  const resetList = useCallback(() => {
    setTotalPayloads([])
    setTotalPayloadsCount(0)
    setCursor(undefined)
    setLoading(false)
    setClearNewPayloads(previous => previous + 1)
  }, [])

  const updateTotalPayloads = (additionalPayloads?: WithStorageMeta<Payload>[]) => {
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
  }

  const { fetchMorePayloads, error: newPayloadsError } = useNextPayloads(
    setLoading,
    cursor,
    totalPayloads,
    updateTotalPayloads,
    clearNewPayloads,
    undefined,
    archivist,
  )

  const value = useMemo<PayloadListState>(() => ({
    errors: [newPayloadsError],
    fetchMorePayloads,
    loading,
    cursor,
    provided: true,
    resetList,
    scrollRef,
    scrollToTop,
    setLoading,
    setCursor,
    totalPayloads,
    totalPayloadsCount,
    updateTotalPayloads,
  }), [
    fetchMorePayloads,
    loading,
    newPayloadsError,
    cursor,
    resetList,
    scrollRef,
    scrollToTop,
    setLoading,
    setCursor,
    totalPayloads,
    totalPayloadsCount,
    updateTotalPayloads])

  return (
    <PayloadListContext.Provider
      value={value}
    >
      {children}
    </PayloadListContext.Provider>
  )
}
