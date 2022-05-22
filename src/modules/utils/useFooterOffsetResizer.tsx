import { MutableRefObject, useLayoutEffect } from 'react'

interface OffsetResizerArgs {
  targetElementRef: MutableRefObject<HTMLElement | undefined>
  observedElementRef: MutableRefObject<HTMLElement | undefined>
  condition?: boolean
}

/**
 * Useful for calculating the height of one element to adjust another
 */

const useFooterOffsetResizer = ({ targetElementRef, observedElementRef, condition = true }: OffsetResizerArgs) => {
  useLayoutEffect(() => {
    const observer = new ResizeObserver(() => {
      if (targetElementRef?.current && observedElementRef?.current) {
        const observedHeight = `${observedElementRef.current?.clientHeight}px`
        targetElementRef.current.style.paddingBottom = observedHeight
      }
    })
    if (observedElementRef?.current && condition) {
      observer.observe(observedElementRef.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [condition, observedElementRef, targetElementRef])

  return <></>
}

export { useFooterOffsetResizer }
