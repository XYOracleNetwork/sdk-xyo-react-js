import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'

import type { PageStateKeys } from '../lib/index.ts'

export interface DefaultPageStateParams<TQueryParams extends PageStateKeys = PageStateKeys> {
  queryParams: TQueryParams
}

export type DefaultPageStateReturn<TPageStateKeys extends PageStateKeys = PageStateKeys> = [
  Record<TPageStateKeys[number], string>,
  (source: keyof DefaultPageStateParams, key: TPageStateKeys[number], value: string) => void,
]

/**
 * Hook to get default page state as key value pairs from various sources.  It provides a convenient abstraction over free form
 * page state like query params by narrowing the used params and centralizing their logic.
 *
 * Future work could include adding support for localStorage, sessionStorage, and precedence of sources.
 * @param defaultPageStateParams various sources of default page state (i.e. queryParams, localStorage, etc.)
 * @returns
 */
export const useDefaultPageState = <TQueryParams extends PageStateKeys = PageStateKeys>(
  { queryParams }: DefaultPageStateParams<TQueryParams>,
): DefaultPageStateReturn<TQueryParams> => {
  const [searchParams, setSearchParams] = useSearchParams()

  const patchDefaultPageState = (source: keyof DefaultPageStateParams, key: TQueryParams[number], value: string) => {
    switch (source) {
      case 'queryParams': {
        setSearchParams((prevSearchParams) => {
          const newSearchParams = new URLSearchParams(prevSearchParams)
          newSearchParams.set(key, value)
          return newSearchParams
        })
        break
      }
      default: {
        throw new Error(`Invalid source for default page state: ${source}`)
      }
    }
  }

  const queryParamsState = useMemo(() => {
    if (!queryParams) return {} as Record<TQueryParams[number], string>
    let defaultState = {} as Record<TQueryParams[number], string>
    for (const [key, value] of searchParams.entries()) {
      if (queryParams.includes(key)) {
        defaultState[key as TQueryParams[number]] = value
      }
    }
    return defaultState
  }, [searchParams, queryParams])

  return [queryParamsState, patchDefaultPageState]
}
