import { WithChildren } from '@xylabs/react-shared'
import { LoadResult } from '@xyo-network/react-shared'

import { useResolvePayload } from '../contexts'

export const EmbedResolver: React.FC<WithChildren> = ({ children }) => {
  const { payload, notFound, huriError } = useResolvePayload()

  return (
    <LoadResult searchResult={payload} notFound={!!notFound} error={!!huriError}>
      {children}
    </LoadResult>
  )
}
