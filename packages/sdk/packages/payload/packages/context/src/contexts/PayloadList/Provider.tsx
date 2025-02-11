import type { ArchivistInstance, NextOptions } from '@xyo-network/archivist-model'
import type { Sequence } from '@xyo-network/payload-model'
import { useEvent } from '@xyo-network/react-event'
import type { PaginationNouns } from '@xyo-network/react-payload-table'
import type { PropsWithChildren } from 'react'
import React, {
  useCallback, useMemo, useState,
} from 'react'

import { PayloadListContext } from './Context.tsx'
import { useNextPayloads, useTotalPayloads } from './hooks/index.ts'
import type { PayloadListState } from './State.ts'

export interface PayloadListProviderProps extends PropsWithChildren {
  archivist?: ArchivistInstance
  nextOptions?: NextOptions
}

export const PayloadListProvider: React.FC<PayloadListProviderProps> = ({
  archivist, children, nextOptions: nextOptionsProp,
}) => {
  const {
    totalPayloads, totalPayloadsCount, updateTotalPayloads, updateTotalPayloadsCount,
  } = useTotalPayloads()

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
    updateTotalPayloads([])
    updateTotalPayloadsCount(0)
    setCursor(undefined)
    setLoading(false)
    setClearNewPayloads(previous => previous + 1)
  }, [])

  const nextOptions = useMemo(() => ({
    ...nextOptionsProp,
    cursor,
  }), [cursor, nextOptionsProp])

  const { fetchMorePayloads, error: newPayloadsError } = useNextPayloads(
    setLoading,
    totalPayloads,
    updateTotalPayloads,
    clearNewPayloads,
    archivist,
    nextOptions,
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
