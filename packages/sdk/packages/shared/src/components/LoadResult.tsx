import { FlexGrowRow } from '@xylabs/react-flexbox'
import { PropsWithChildren } from 'react'

import { NotFound } from './NotFound.js'

export interface LoadResultProps<T> {
  /** @deprecated - use error prop */
  apiError?: Error
  /** Defer error handling to the children and load them */
  error?: boolean
  notFound: boolean
  searchResult: T | undefined
}

export function LoadResult<T>(props: PropsWithChildren<LoadResultProps<T>>) {
  const { notFound, error, searchResult, children } = props
  if (notFound) {
    return <NotFound />
  }
  if (error) {
    return <>{children}</>
  }
  return searchResult === undefined ? <FlexGrowRow busy minHeight="50px" /> : <>{children}</>
}
