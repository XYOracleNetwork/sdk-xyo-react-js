import { useEffect, useMemo } from 'react'

export type XyoEventNoun = 'payload' | 'boundwitness' | 'address'
export type XyoEventVerb = 'click'

export interface XyoEvent {
  noun: XyoEventNoun
  verb: XyoEventVerb
  data?: string
}

export const useXyoEvent = <T extends HTMLElement>(element: T | null, listen?: (noun?: XyoEventNoun, verb?: XyoEventVerb, data?: string) => void) => {
  useEffect(() => {
    const listenFunction = listen
    const func = (event: CustomEventInit<XyoEvent>) => {
      console.log(`func: ${JSON.stringify(event, null, 2)}`)
      return listenFunction?.(event.detail?.noun, event.detail?.verb, event.detail?.data)
    }
    if (listenFunction) {
      console.log('adding listen')
      element?.addEventListener('xyo', func, false)
    }
    return () => {
      if (listenFunction && element) {
        element?.removeEventListener('xyo', func)
      }
    }
  }, [element, listen])

  const dispatch = (noun: XyoEventNoun, verb: XyoEventVerb, data?: string) => {
    const event = new CustomEvent<XyoEvent>('xyo', { bubbles: true, cancelable: true, composed: true, detail: { data, noun, verb } })
    element?.dispatchEvent(event)
  }

  return { dispatch }
}
