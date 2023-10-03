import type { WithChildren } from '@xylabs/react-shared'
import { ModuleErrorSchema } from '@xyo-network/payload-model'
import { ErrorRender } from '@xyo-network/react-error'
import { useBuildHuri } from '@xyo-network/react-payload-huri'
import { useParams, useSearchParams } from 'react-router-dom-6'

import { useDivinePayload } from '../PayloadDiviner'
import { DivinedPayloadContext } from './Context'
import { useDivinedPayload } from './use'

export interface DivinedPayloadProviderProps extends WithChildren {
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
    <ErrorRender
      error={payloadError ? { message: payloadError.message, schema: ModuleErrorSchema, sources: [] } : undefined}
      errorContext="Divined Payload Provider"
    >
      {children}
    </ErrorRender>
  )
}

export const DivinedPayloadWithHandleProvider: React.FC<DivinedPayloadProviderProps> = ({ children, ...props }) => {
  return (
    <DivinedPayloadProvider {...props}>
      <DivinedPayloadWithHandleInner>{children}</DivinedPayloadWithHandleInner>
    </DivinedPayloadProvider>
  )
}
