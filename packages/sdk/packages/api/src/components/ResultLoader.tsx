import { FlexGrowRow } from '@xylabs/react-flexbox'
import { XyoApiError } from '@xyo-network/api-models'
import { XyoError } from '@xyo-network/module'
import { NotFound } from '@xyo-network/react-shared'
import { PropsWithChildren } from 'react'

export interface HandleItemDetailLoadingProps<T> {
  apiError: Error | XyoApiError | XyoError | undefined
  notFound: boolean
  searchResult: T | undefined
}

/** @deprecated - moved to @xyo-network/react-shared as LoadResult */
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
