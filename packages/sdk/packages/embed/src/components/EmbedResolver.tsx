import type { WithChildren } from '@xylabs/react-shared'
import { LoadResult } from '@xyo-network/react-shared'
import React from 'react'

import { useResolvePayload } from '../contexts/index.ts'

export const EmbedResolver: React.FC<WithChildren> = ({ children }) => {
  const { payload, notFound, huriError } = useResolvePayload()

  return (
    <LoadResult searchResult={payload} notFound={!!notFound} error={!!huriError}>
      {children}
    </LoadResult>
  )
}
