/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'

function useAsyncEffect(effect: (isMounted: () => boolean) => Promise<(() => void) | void>, inputs: unknown[]) {
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
  }, inputs)
}

export default useAsyncEffect
