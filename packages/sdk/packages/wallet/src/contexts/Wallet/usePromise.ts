// Inspired from https://github.com/bsonntag/react-use-promise

import { Mutex } from 'async-mutex'
import { DependencyList, useEffect, useMemo, useState } from 'react'

export enum State {
  pending = 'pending',
  rejected = 'rejected',
  resolved = 'resolved',
}

/**
 * usePromise -
 */
export const usePromise = <TResult>(
  promise: () => Promise<TResult | undefined>,
  dependencies: DependencyList,
  debug: string | undefined = undefined,
): [TResult | undefined, Error | undefined, State | undefined] => {
  const [result, setResult] = useState<TResult>()
  const [error, setError] = useState<Error>()
  const [state, setState] = useState<State>(State.pending)
  const mutex = useMemo(() => {
    return new Mutex()
  }, [])

  if (debug) console.log(`usePromise [${debug}]: started [${typeof promise}]`)

  const promiseMemo: Promise<TResult | undefined> | undefined = useMemo(() => {
    try {
      if (debug) console.log(`usePromise [${debug}]: re-memo [${typeof promise}]`)
      setState(State.pending)
      return promise?.()
    } catch (e) {
      if (debug) console.log(`usePromise [${debug}]: useMemo rejection [${typeof promise}]`)
      setResult(undefined)
      setError(e as Error)
      setState(State.rejected)
    }
  }, dependencies)

  if (debug) console.log(`usePromise [${debug}] Main Function`)

  useEffect(() => {
    if (debug) console.log(`usePromise [${debug}] useEffect`)
    mutex
      ?.acquire()
      .then(() => {
        promiseMemo
          ?.then((payload) => {
            if (debug) console.log(`usePromise [${debug}] then`)
            setResult(payload)
            setError(undefined)
            setState(State.resolved)
            mutex?.release()
          })
          .catch((e) => {
            const error = e as Error
            console.error(`usePromise: ${error.message}`)
            setResult(undefined)
            setError(error)
            setState(State.rejected)
            mutex?.release()
          })
      })
      .catch((e) => {
        const error = e as Error
        console.error(`usePromise: ${error.message}`)
        setResult(undefined)
        setError(error)
        setState(State.rejected)
        mutex?.release()
      })
    return () => {
      if (debug) console.log(`usePromise [${debug}] useEffect callback`)
    }
  }, [...dependencies, promiseMemo])
  if (debug) console.log(`usePromise [${debug}] returning ${JSON.stringify([result, error, state], null, 2)}`)
  return [result, error, state]
}
