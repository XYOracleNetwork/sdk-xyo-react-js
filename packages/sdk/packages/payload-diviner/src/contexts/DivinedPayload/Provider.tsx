import { WithChildren } from '@xylabs/react-shared'
import { ResultLoader } from '@xyo-network/react-api'
import { XyoApiErrorRender } from '@xyo-network/react-auth-service'
import { useParams, useSearchParams } from 'react-router-dom'

import { useDivinePayload } from '../PayloadDiviner'
import { DivinedPayloadContext } from './Context'
import { useBuildHuri } from './hooks'
import { useDivinedPayload } from './use'

interface DivinedPayloadProviderProps extends WithChildren {
  hash?: string
}

export const DivinedPayloadProvider: React.FC<DivinedPayloadProviderProps> = ({ children, hash }) => {
  const { hash: hashParam } = useParams()

  const huriFromHashParam = useBuildHuri(hashParam)

  const [params] = useSearchParams()
  const huriSearchParameter = params.get('huri')
  const decodedHuriParam = decodeURIComponent(huriSearchParameter ?? '')
  const huriUri = hash ?? decodedHuriParam ? decodedHuriParam : huriFromHashParam

  const [payload, setPayload, payloadError] = useDivinePayload(huriUri)

  return <DivinedPayloadContext.Provider value={{ payload, payloadError, provided: true, setPayload }}>{children}</DivinedPayloadContext.Provider>
}

export const DivinedPayloadWithHandleInner: React.FC<WithChildren> = ({ children }) => {
  const { payload, payloadError } = useDivinedPayload()

  return (
    <ResultLoader searchResult={payload} apiError={payloadError} notFound={payload === null}>
      <XyoApiErrorRender apiError={payloadError}>{children}</XyoApiErrorRender>
    </ResultLoader>
  )
}

export const DivinedPayloadWithHandleProvider: React.FC<DivinedPayloadProviderProps> = ({ children, ...props }) => {
  return (
    <DivinedPayloadProvider {...props}>
      <DivinedPayloadWithHandleInner>{children}</DivinedPayloadWithHandleInner>
    </DivinedPayloadProvider>
  )
}
