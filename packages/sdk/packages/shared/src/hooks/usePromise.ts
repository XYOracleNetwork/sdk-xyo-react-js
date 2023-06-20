// Inspired from https://github.com/bsonntag/react-use-promise

import { Promisable } from '@xyo-network/promise'
import { DependencyList, useEffect, useMemo, useReducer, useState } from 'react'

export enum State {
  pending = 'pending',
  rejected = 'rejected',
  resolved = 'resolved',
  idle = 'idle',
}

const defaultState = {
  error: undefined,
  result: undefined,
  state: State.idle,
} as const

const reducer = (_state: PromiseState, action: Action) => {
  console.log(action)
  switch (action.type) {
    // case State.pending:
    //   return defaultState

    // case State.resolved:
    //   return {
    //     error: undefined,
    //     result: action.payload,
    //     state: State.resolved,
    //   }

    case State.rejected:
      // State is never reached
      return {
        error: action.error,
        result: undefined,
        state: State.rejected,
      }

    default:
      return defaultState
    // throw Error(`Error parsing action ${JSON.stringify(action, null, 2)}`)
  }
}

interface PromiseState<T = unknown> {
  error?: Error
  result?: T
  state?: State
}

type Action<T = unknown> = { error?: Error; payload?: T; type: State }

/**
 * usePromise -
 */
export const usePromise = <TResult>(
  promise: () => Promisable<TResult> | undefined,
  dependencies: DependencyList = [],
  debug: string | undefined = undefined,
): [TResult | undefined, Error | undefined, State | undefined, Error | undefined] => {
  const [{ error, result, state }, dispatch] = useReducer(reducer, { error: undefined, result: undefined, state: State.idle })

  // Test State value for manually setting errors outside of the reducer
  const [testError, setTestError] = useState<Error>()

  const promiseMemo = useMemo(() => {
    try {
      return promise?.()
    } catch (e) {
      dispatch({
        error: e as Error,
        payload: undefined,
        type: State.rejected,
      })
    }
  }, dependencies)

  if (debug) console.debug(`usePromise [${debug}] Main Function`)

  useEffect(() => {
    let cancelled = false
    dispatch({ type: State.pending })
    if (debug) console.debug(`usePromise [${debug}] useEffect [cancelled: ${cancelled}]`)
    if (promiseMemo instanceof Promise) {
      promiseMemo
        .then((payload) => {
          if (debug) console.debug(`usePromise [${debug}] then [cancelled: ${cancelled}]`)
          !cancelled ??
            dispatch({
              error: undefined,
              payload,
              type: State.resolved,
            })
        })
        .catch((error) => {
          if (debug) console.debug(`usePromise [${debug}] catch [cancelled: ${cancelled}]`)
          !cancelled ??
            dispatch({
              error,
              payload: undefined,
              type: State.rejected,
            })
          // Set state knowing there was an error
          setTestError(error)
        })
    } else if (promiseMemo) {
      dispatch({
        error: undefined,
        payload: promiseMemo,
        type: State.resolved,
      })
    } else {
      if (debug) console.debug(`usePromise [${debug}] no-promise [cancelled: ${cancelled}]`)
      !cancelled ??
        dispatch({
          error: undefined,
          payload: undefined,
          type: State.resolved,
        })
    }
    return () => {
      if (debug) console.debug(`usePromise [${debug}] useEffect callback`)
      cancelled = true
    }
  }, [promiseMemo])

  return [result as TResult, error, state, testError]
}
