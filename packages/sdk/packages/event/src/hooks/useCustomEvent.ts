import { assertEx } from '@xylabs/assert'
import { createRef, RefObject, useEffect } from 'react'

export type CustomEventDispatch<T = unknown> = (detail: T) => boolean | void

export const useCustomEvent = <TElement extends HTMLElement, TDetail = unknown>(
  type: string,
  listener?: CustomEventDispatch<TDetail>,
): [RefObject<TElement>, CustomEventDispatch<TDetail>] => {
  const ref = createRef<TElement>()
  useEffect(() => {
    const element = ref?.current
    const currentListener = listener
    const handler = currentListener
      ? (event: CustomEventInit<TDetail> & Event) => {
          const detail = assertEx(event.detail, 'XyoEvent missing detail')
          const stop = currentListener(detail)
          if (stop) {
            event.stopPropagation()
          }
        }
      : undefined

    if (handler && element) {
      element?.addEventListener(type, handler)
    }
    return () => {
      if (handler && element) {
        element?.removeEventListener('xyo', handler)
      }
    }
  })
  const dispatch: CustomEventDispatch<TDetail> = (detail?: TDetail) => {
    const event = new CustomEvent<TDetail>(type, {
      bubbles: true,
      cancelable: true,
      composed: true,
      detail,
    })
    ref.current?.dispatchEvent(event)
  }
  return [ref, dispatch]
}
