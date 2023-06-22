// Inspired from https://github.com/bsonntag/react-use-promise

import { Promisable } from '@xyo-network/promise'
import { DependencyList, Reducer, useEffect, useMemo, useReducer } from 'react'

export enum State {
  pending = 'pending',
  rejected = 'rejected',
  resolved = 'resolved',
}

interface PromiseState<T = void> {
  error?: Error
  result?: T
  state?: State
}

type Action<T> = { error?: Error; payload?: T; type: State }

/**
 * usePromise -
 */
export const usePromise = <TResult>(
  promise: () => Promisable<TResult> | undefined,
  dependencies: DependencyList = [],
  debug: string | undefined = undefined,
): [TResult | undefined, Error | undefined, State | undefined] => {
  const defaultState: PromiseState<TResult> = {
    error: undefined,
    result: undefined,
    state: State.pending,
  }

  const reducer: Reducer<PromiseState<TResult>, Action<TResult>> = (_state: PromiseState<TResult>, action: Action<TResult>) => {
    switch (action.type) {
      case State.pending:
        return defaultState

      case State.resolved:
        return {
          error: undefined,
          result: action.payload,
          state: State.resolved,
        }

      case State.rejected:
        return {
          error: action.error,
          result: undefined,
          state: State.rejected,
        }

      default:
        throw Error(`Error parsing action ${JSON.stringify(action, null, 2)}`)
    }
  }

  const [{ error, result, state }, dispatch] = useReducer(reducer, defaultState)

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
    dispatch({ type: State.pending })
    if (debug) console.debug(`usePromise [${debug}] useEffect`)
    if (promiseMemo instanceof Promise) {
      promiseMemo
        .then((payload) => {
          if (debug) console.debug(`usePromise [${debug}] then`)
          dispatch({
            error: undefined,
            payload,
            type: State.resolved,
          })
        })
        .catch((error) => {
          if (debug) console.debug(`usePromise [${debug}] catch`)
          dispatch({
            error: error as Error,
            payload: undefined,
            type: State.rejected,
          })
        })
    } else if (promiseMemo) {
      dispatch({
        error: undefined,
        payload: promiseMemo,
        type: State.resolved,
      })
    } else {
      if (debug) console.debug(`usePromise [${debug}] no-promise`)
      dispatch({
        error: undefined,
        payload: undefined,
        type: State.resolved,
      })
    }
    return () => {
      if (debug) console.debug(`usePromise [${debug}] useEffect callback`)
    }
  }, [promiseMemo])

  return [result, error, state]
}
