import type { ArchivistInstance, NextOptions } from '@xyo-network/archivist-model'
import type { PropsWithChildren } from 'react'
import React, { useCallback, useMemo } from 'react'

import { PayloadListContext } from './Context.tsx'
import {
  useNextPayloads, useTableUi, useTotalPayloads,
} from './hooks/index.ts'
import type { PayloadListState } from './State.ts'

export interface PayloadListProviderProps extends PropsWithChildren {
  archivist?: ArchivistInstance
  // NOTE: Be sure your nextOptions have a higher limit then the pageSize of the list/table
  nextOptions?: NextOptions
}

/**
 * Provider for the PayloadListContext
 * NOTE: Be sure your nextOptions have a higher limit then the pageSize of the list/table
 */
export const PayloadListProvider: React.FC<PayloadListProviderProps> = ({
  archivist, children, nextOptions: nextOptionsProp,
}) => {
  const {
    cursor, onNext, totalPayloads, totalPayloadsCount, updateTotalPayloads, updateTotalPayloadsCount, updateCursor,
  } = useTotalPayloads()

  const {
    loading, updateLoading, scrollToTop, scrollRef,
  } = useTableUi(onNext)

  const resetList = useCallback(() => {
    updateTotalPayloads([])
    updateTotalPayloadsCount(0)
    updateCursor()
    updateLoading(false)
    updateClearNewPayloads(previous => previous + 1)
  }, [])

  const nextOptions = useMemo(() => ({
    ...nextOptionsProp,
    cursor,
  }), [cursor, nextOptionsProp])

  const {
    fetchMorePayloads, error: newPayloadsError, updateClearNewPayloads,
  } = useNextPayloads(
    updateLoading,
    totalPayloads,
    updateTotalPayloads,
    archivist,
    nextOptions,
  )

  // TODO - split these into separate contexts
  const value = useMemo<PayloadListState>(() => ({
    errors: [newPayloadsError],
    fetchMorePayloads,
    loading,
    cursor,
    provided: true,
    resetList,
    scrollRef,
    scrollToTop,
    updateLoading,
    updateCursor,
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
    updateLoading,
    updateCursor,
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
