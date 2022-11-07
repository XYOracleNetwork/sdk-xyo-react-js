// Inspired from https://github.com/bsonntag/react-use-promise

import { useEffect, useMemo, useReducer } from 'react'

type PromiseOrFunction<T> = Promise<T> | (() => Promise<T>)

const resolvePromise = <T,>(promise: PromiseOrFunction<T>) => {
  if (typeof promise === 'function') {
    return promise()
  }

  return promise
}

enum State {
  pending = 'pending',
  rejected = 'rejected',
  resolved = 'resolved',
}

interface PromiseState<T = void> {
  error?: Error
  result?: T
  state?: State
}

const defaultState: PromiseState = {
  error: undefined,
  result: undefined,
  state: State.pending,
}

// Since the resolved promise value can be anything, any seems appropriate
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Action = { type: State; payload?: any }

const reducer = (_state: PromiseState, action: Action) => {
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
        error: action.payload,
        result: undefined,
        state: State.rejected,
      }

    default:
      throw Error(`Error parsing action ${JSON.stringify(action, null, 2)}`)
  }
}

export const usePromise = <T,>(promiseArg: PromiseOrFunction<T>, inputs: unknown[] = []) => {
  const [{ error, result, state }, dispatch] = useReducer(reducer, defaultState)

  const dependencies = useMemo(() => [promiseArg, ...inputs], [inputs, promiseArg])

  useEffect(() => {
    const promise = resolvePromise<T>(promiseArg)

    if (!promise) {
      return
    }

    let canceled = false

    dispatch({ type: State.pending })

    promise.then(
      (result) =>
        !canceled &&
        dispatch({
          payload: result,
          type: State.resolved,
        }),
      (error) =>
        !canceled &&
        dispatch({
          payload: error,
          type: State.rejected,
        }),
    )

    return () => {
      canceled = true
    }
    // eslint can't inspect the array to verify dependencies are missing
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies)

  return [result, error, state]
}
