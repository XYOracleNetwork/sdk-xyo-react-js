// Inspired from https://github.com/bsonntag/react-use-promise

import { useAsyncEffect } from '@xylabs/react-async-effect'
import { Promisable } from '@xyo-network/promise'
import { useReducer } from 'react'

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

const defaultState: PromiseState = {
  error: undefined,
  result: undefined,
  state: State.pending,
}

// Since the resolved promise value can be anything, any seems appropriate
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Action = { payload?: any; type: State }

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

/**
 * usePromise -
 */
export const usePromise = <TResult>(
  promise?: Promisable<TResult>,
  dependencies: unknown[] = [],
): [TResult | undefined, Error | undefined, State | undefined] => {
  const [{ error, result, state }, dispatch] = useReducer(reducer, defaultState)

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async () => {
      if (!promise) {
        return
      }

      let canceled = false

      dispatch({ type: State.pending })

      try {
        const result = await promise
        !canceled
          ? dispatch({
              payload: result,
              type: State.resolved,
            })
          : undefined
      } catch (e) {
        !canceled
          ? dispatch({
              payload: e as Error,
              type: State.rejected,
            })
          : undefined
      }

      return () => {
        canceled = true
      }
    },
    // eslint can't inspect the array to verify dependencies are missing
    // eslint-disable-next-line react-hooks/exhaustive-deps
    dependencies,
  )

  return [result, error, state]
}
