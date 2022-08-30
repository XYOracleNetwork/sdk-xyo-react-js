import { FlexGrowRow } from '@xylabs/react-flexbox'
import { XyoApiError } from '@xyo-network/api'
import { PropsWithChildren } from 'react'

import { NotFound } from './NotFoundPage'

export interface HandleItemDetailLoadingProps<T> {
  apiError: Error | XyoApiError | undefined
  notFound: boolean
  searchResult: T | undefined
}

export function ResultLoader<T>(props: PropsWithChildren<HandleItemDetailLoadingProps<T>>) {
  const { notFound, apiError, searchResult, children } = props
  if (notFound) {
    return <NotFound />
  }
  // Defer error handling to the children
  if (apiError) {
    return <>{children}</>
  }
  if (searchResult === undefined) {
    return <FlexGrowRow busy minHeight="50px" />
  } else {
    return <>{children}</>
  }
}
