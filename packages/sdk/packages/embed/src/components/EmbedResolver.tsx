import { WithChildren } from '@xylabs/react-shared'
import { ResultLoader } from '@xyo-network/react-api'

import { useResolvePayload } from '../contexts'

export const EmbedResolver: React.FC<WithChildren> = ({ children }) => {
  const { payload, notFound, huriError } = useResolvePayload()

  return (
    <ResultLoader searchResult={payload} notFound={!!notFound} apiError={huriError}>
      {children}
    </ResultLoader>
  )
}
