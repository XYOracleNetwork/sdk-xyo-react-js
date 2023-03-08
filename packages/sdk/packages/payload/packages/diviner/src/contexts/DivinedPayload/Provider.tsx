import { WithChildren } from '@xylabs/react-shared'
import { XyoErrorSchema } from '@xyo-network/module'
import { XyoErrorRender } from '@xyo-network/react-error'
import { useBuildHuri } from '@xyo-network/react-payload-huri'
import { useParams, useSearchParams } from 'react-router-dom'

import { useDivinePayload } from '../PayloadDiviner'
import { DivinedPayloadContext } from './Context'
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
  const huriUri = hash ?? (decodedHuriParam ? decodedHuriParam : huriFromHashParam)

  const [payload, setPayload, payloadError] = useDivinePayload(huriUri)

  return <DivinedPayloadContext.Provider value={{ payload, payloadError, provided: true, setPayload }}>{children}</DivinedPayloadContext.Provider>
}

export const DivinedPayloadWithHandleInner: React.FC<WithChildren> = ({ children }) => {
  const { payloadError } = useDivinedPayload()

  return (
    <XyoErrorRender
      error={payloadError ? { message: payloadError.message, schema: XyoErrorSchema, sources: [] } : undefined}
      errorContext="Divined Payload Provider"
    >
      {children}
    </XyoErrorRender>
  )
}

export const DivinedPayloadWithHandleProvider: React.FC<DivinedPayloadProviderProps> = ({ children, ...props }) => {
  return (
    <DivinedPayloadProvider {...props}>
      <DivinedPayloadWithHandleInner>{children}</DivinedPayloadWithHandleInner>
    </DivinedPayloadProvider>
  )
}
