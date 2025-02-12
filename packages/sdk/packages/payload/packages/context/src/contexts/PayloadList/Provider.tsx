import type { ArchivistInstance, NextOptions } from '@xyo-network/archivist-model'
import type { PropsWithChildren } from 'react'
import React, { useCallback, useMemo } from 'react'

import { PayloadListContext } from './Context.tsx'
import {
  useNextPayloads, useTableUi, useTotalPayloads,
} from './hooks/index.ts'
import type { PayloadListState, UIState } from './State.ts'

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
    cursor, updateCursorFromLastItem, totalPayloads, totalPayloadsCount, updateTotalPayloads, updateTotalPayloadsCount, updateCursor,
  } = useTotalPayloads()

  const {
    loading, updateLoading, scrollToTop, scrollRef,
  } = useTableUi(updateCursorFromLastItem)

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

  const uiState: UIState = useMemo(() => ({
    loading,
    scrollRef,
    scrollTo,
    updateLoading,
  }), [loading, scrollRef, scrollToTop])

  const totalPayloadsState = useMemo(() => ({
    cursor,
    fetchMorePayloads,
    totalPayloads,
    totalPayloadsCount,
    updateCursor,
    updateTotalPayloads,
  }), [cursor, fetchMorePayloads, totalPayloads, totalPayloadsCount])

  const value = useMemo<PayloadListState>(() => ({
    errors: [newPayloadsError],
    provided: true,
    resetList,
    totalPayloadsState,
    uiState,
  }), [
    newPayloadsError,
    resetList,
    uiState,
    totalPayloadsState])

  return (
    <PayloadListContext.Provider
      value={value}
    >
      {children}
    </PayloadListContext.Provider>
  )
}
