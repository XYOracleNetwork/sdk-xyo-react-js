import type { RefObject } from 'react'

import { useCustomEvent } from './useCustomEvent.ts'

export type EventNoun = 'payload' | 'boundwitness' | 'address' | 'hash' | 'signature' | 'schema'
export type ExtendEventNoun<Extension extends string | void = void> = Extension extends string ? Extension : EventNoun

export type EventVerb = 'click' | 'favorite'

export interface Event<TNoun = ExtendEventNoun, TVerb = EventVerb, TData = string> {
  data?: TData
  noun: TNoun
  verb: TVerb
}

export type EventDispatch<TNoun = ExtendEventNoun, TVerb = EventVerb, TData = string> = (noun: TNoun, verb: TVerb, data?: TData) => boolean | void

export const useEvent = <T extends HTMLElement, TNoun = ExtendEventNoun, TVerb = EventVerb, TData = string>(
  listener?: EventDispatch<TNoun, TVerb, TData>,
  sharableRef?: RefObject<T | null>,
): [RefObject<T | null>, EventDispatch<TNoun, TVerb, TData>] => {
  const [ref, customDispatch] = useCustomEvent<T, Event<TNoun, TVerb, TData>>(
    'xyo',
    listener
      ? (detail: Event<TNoun, TVerb, TData>) => {
          return listener(detail.noun, detail.verb, detail.data)
        }
      : undefined,
    sharableRef,
  )

  const dispatch: EventDispatch<TNoun, TVerb, TData> = (noun: TNoun, verb: TVerb, data?: TData) => {
    return customDispatch({
      data, noun, verb,
    })
  }
  return [ref, dispatch]
}
