import { WithChildren } from '@xylabs/react-shared'
import { ResultLoader } from '@xyo-network/react-webapp'

import { useResolvePayload } from '../contexts'

export const EmbedResolver: React.FC<WithChildren> = ({ children }) => {
  const { payload, notFound, huriApiError } = useResolvePayload()

  return (
    <ResultLoader searchResult={payload} notFound={!!notFound} apiError={huriApiError}>
      {children}
    </ResultLoader>
  )
}
