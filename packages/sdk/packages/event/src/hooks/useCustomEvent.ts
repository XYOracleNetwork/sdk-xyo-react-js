import { assertEx } from '@xylabs/assert'
import type { RefObject } from 'react'
import { createRef, useEffect } from 'react'

export type CustomEventDispatch<T = unknown> = (detail: T) => boolean | void

export const useCustomEvent = <TElement extends HTMLElement, TDetail = unknown>(
  type: string,
  listener?: CustomEventDispatch<TDetail>,
  customRef?: RefObject<TElement>,
): [RefObject<TElement>, CustomEventDispatch<TDetail>] => {
  // eslint-disable-next-line @eslint-react/no-create-ref
  const ref = customRef ?? createRef<TElement>()
  useEffect(() => {
    const element = ref?.current
    const currentListener = listener
    const handler
      = currentListener
        ? (event: CustomEventInit<TDetail> & Event) => {
            const detail = assertEx(event.detail, () => 'Event missing detail')
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
        element?.removeEventListener(type, handler)
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
