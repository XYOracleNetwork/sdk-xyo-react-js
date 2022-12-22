import { FlexGrowRow } from '@xylabs/react-flexbox'
import { PropsWithChildren } from 'react'

import { NotFound } from './NotFound'

export interface HandleItemDetailLoadingProps<T> {
  /** @deprecated - use error */
  apiError?: Error
  /** Defer error handling to the children and load them */
  error?: boolean
  notFound: boolean
  searchResult: T | undefined
}

export function ResultLoader<T>(props: PropsWithChildren<HandleItemDetailLoadingProps<T>>) {
  const { notFound, error, searchResult, children } = props
  if (notFound) {
    return <NotFound />
  }
  if (error) {
    return <>{children}</>
  }
  if (searchResult === undefined) {
    return <FlexGrowRow busy minHeight="50px" />
  } else {
    return <>{children}</>
  }
}
