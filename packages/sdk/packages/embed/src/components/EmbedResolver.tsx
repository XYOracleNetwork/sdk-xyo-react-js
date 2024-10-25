import { LoadResult } from '@xyo-network/react-shared'
import type { PropsWithChildren } from 'react'
import React from 'react'

import { useResolvePayload } from '../contexts/index.ts'

export const EmbedResolver: React.FC<PropsWithChildren> = ({ children }) => {
  const {
    payload, notFound, huriError,
  } = useResolvePayload()

  return (
    <LoadResult searchResult={payload} notFound={!!notFound} error={!!huriError}>
      {children}
    </LoadResult>
  )
}
