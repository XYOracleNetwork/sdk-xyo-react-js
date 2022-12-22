import { WithChildren } from '@xylabs/react-shared'
import { ResultLoader } from '@xyo-network/react-shared'

import { useResolvePayload } from '../contexts'

export const EmbedResolver: React.FC<WithChildren> = ({ children }) => {
  const { payload, notFound, huriError } = useResolvePayload()

  return (
    <ResultLoader searchResult={payload} notFound={!!notFound} error={!!huriError}>
      {children}
    </ResultLoader>
  )
}
