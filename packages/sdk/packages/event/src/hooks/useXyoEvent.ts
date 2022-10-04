import { RefObject } from 'react'

import { useCustomEvent } from './useCustomEvent'

export type XyoEventNoun = 'payload' | 'boundwitness' | 'address' | 'pagechange'
export type XyoEventVerb = 'click'

export interface XyoEvent<TNoun = XyoEventNoun, TVerb = XyoEventVerb, TData = string> {
  noun: TNoun
  verb: TVerb
  data?: TData
}

export type XyoEventDispatch<TNoun = XyoEventNoun, TVerb = XyoEventVerb, TData = string> = (noun: TNoun, verb: TVerb, data?: TData) => boolean | void

export const useXyoEvent = <T extends HTMLElement, TNoun = XyoEventNoun, TVerb = XyoEventVerb, TData = string>(
  listener?: XyoEventDispatch<TNoun, TVerb, TData>,
): [RefObject<T>, XyoEventDispatch<TNoun, TVerb, TData>] => {
  const [ref, customDispatch] = useCustomEvent<T, XyoEvent<TNoun, TVerb, TData>>(
    'xyo',
    listener
      ? (detail: XyoEvent<TNoun, TVerb, TData>) => {
          return listener(detail.noun, detail.verb, detail.data)
        }
      : undefined,
  )

  const dispatch: XyoEventDispatch<TNoun, TVerb, TData> = (noun: TNoun, verb: TVerb, data?: TData) => {
    return customDispatch({ data, noun, verb })
  }
  return [ref, dispatch]
}
