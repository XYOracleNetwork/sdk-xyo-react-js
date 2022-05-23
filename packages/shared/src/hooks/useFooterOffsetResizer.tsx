import { MutableRefObject, useLayoutEffect } from 'react'

interface OffsetResizerArgs {
  targetElementRef: MutableRefObject<HTMLElement | undefined>
  condition?: boolean
}

/**
 * Useful for calculating the height of the footer and adjusting another element.
 *
 * Note: Happens outside of react rendering to prevent needless rerendering
 */

const useFooterOffsetResizer = ({ targetElementRef, condition = true }: OffsetResizerArgs) => {
  useLayoutEffect(() => {
    const footer = document.getElementsByTagName('footer')[0]

    const observer = new ResizeObserver(() => {
      if (targetElementRef?.current) {
        const observedHeight = `${footer?.clientHeight}px`
        targetElementRef.current.style.paddingBottom = observedHeight
      }
    })

    if (condition) {
      observer.observe(footer)
    } else {
      observer.disconnect()
    }

    return () => {
      observer.disconnect()
    }
  }, [condition, targetElementRef])

  return <></>
}

export { useFooterOffsetResizer }
