import { useEvent } from '@xyo-network/react-event'
import type { PaginationNouns } from '@xyo-network/react-payload-table'
import { useState } from 'react'

export const useTableUi = (onNext?: () => void) => {
  const [loading, setLoading] = useState(false)
  const [scrollToTop, setScrollTop] = useState(0)

  // Context exposes a ref for the table element so the context can react to ui events
  const [scrollRef] = useEvent<HTMLTableElement, PaginationNouns>((noun) => {
    if (scrollRef.current) {
      if ((noun === 'previousPage' || noun === 'nextPage')) {
        // scroll to top of table on each page change
        setScrollTop(previous => previous + 1)
      }
      // if the noun is nextPage, get the last item in totalPayloads and set the cursor to the last item's sequence
      if (noun === 'nextPage') {
        onNext?.()
      }
    }
  })

  return {
    loading,
    updateLoading: setLoading,
    scrollRef,
    scrollToTop,
  }
}
