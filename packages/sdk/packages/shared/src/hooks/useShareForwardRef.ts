import type { ForwardedRef } from 'react'
import { useEffect, useRef } from 'react'

export const useShareForwardedRef = <T>(forwardedRef: ForwardedRef<T> | null | undefined, refresh = 0) => {
  // final ref that will share value with forward ref. this is the one to be attached to components
  const innerRef = useRef<T>(null)

  useEffect(() => {
    if (!forwardedRef) {
      return
    }
    if (typeof forwardedRef === 'function') {
      forwardedRef(innerRef.current)
    } else {
      forwardedRef.current = innerRef.current
    }
  }, [forwardedRef, refresh])

  return innerRef
}
