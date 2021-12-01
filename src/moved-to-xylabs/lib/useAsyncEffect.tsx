/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @delagen/deprecation/deprecation */
import { useEffect } from 'react'

type EffectFuncWithMounted = (isMounted: () => boolean) => Promise<(() => void) | void>
type EffectFuncWithoutMounted = () => Promise<(() => void) | void>
type EffectFunc = EffectFuncWithMounted | EffectFuncWithoutMounted

/** @deprecated Moved to @xylabs/sdk-react */
function useAsyncEffect(effect: EffectFunc, inputs?: unknown[]) {
  useEffect(function () {
    let mounted = true
    const promise: Promise<(() => void) | void> = effect(() => {
      return mounted
    })

    Promise.resolve(promise).then((callback) => {
      if (callback) {
        callback?.()
      }
    })

    return function () {
      mounted = false
    }
  }, inputs ?? [])
}

export default useAsyncEffect
