import { MutableRefObject, useLayoutEffect } from 'react'

/**
 * Useful for calculating the height of the footer and adjusting another element.
 *
 * Note: Happens outside of react rendering to prevent needless rerendering
 */

const useFooterOffsetResizer = (targetElementRef?: MutableRefObject<HTMLElement | undefined>, condition = true) => {
  useLayoutEffect(() => {
    const footer = document.getElementById('footer')

    const observer = new ResizeObserver(() => {
      if (targetElementRef?.current) {
        const observedHeight = `${footer?.clientHeight}px`
        targetElementRef.current.style.paddingBottom = observedHeight
      }
    })

    if (condition && footer) {
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
