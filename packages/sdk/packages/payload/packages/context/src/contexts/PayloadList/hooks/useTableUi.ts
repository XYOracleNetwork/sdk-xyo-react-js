import { useState } from 'react'

export const useTableUi = () => {
  const [loading, setLoading] = useState(false)
  const [scrollToTop, setScrollTop] = useState(0)
  const [clearNewPayloads, setClearNewPayloads] = useState(0)

  return {
    clearNewPayloads,
    updateClearNewPayloads: setClearNewPayloads,
    loading,
    updateLoading: setLoading,
    scrollToTop,
    updateScrollTop: setScrollTop,
  }
}
