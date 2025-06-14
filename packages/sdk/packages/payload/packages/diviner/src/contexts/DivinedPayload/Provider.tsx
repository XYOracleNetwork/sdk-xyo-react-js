import { ErrorRender } from '@xylabs/react-error'
import { ModuleErrorSchema } from '@xyo-network/payload-model'
import { useBuildHuri } from '@xyo-network/react-payload-huri'
import type { PropsWithChildren } from 'react'
import React, { useMemo } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'

import { useDivinePayload } from '../PayloadDiviner/index.ts'
import { DivinedPayloadContext } from './Context.ts'
import type { DivinedPayloadState } from './State.ts'
import { useDivinedPayload } from './use.ts'

export interface DivinedPayloadProviderProps extends PropsWithChildren {
  hash?: string
}

export const DivinedPayloadProvider: React.FC<DivinedPayloadProviderProps> = ({ children, hash }) => {
  const { hash: hashParam } = useParams()

  const huriFromHashParam = useBuildHuri(hashParam)

  const [params] = useSearchParams()
  const huriSearchParameter = params.get('huri')
  const decodedHuriParam = decodeURIComponent(huriSearchParameter ?? '')
  const huriUri = hash ?? decodedHuriParam ?? huriFromHashParam

  const [payload, setPayload, payloadError] = useDivinePayload(huriUri)

  const value: DivinedPayloadState = useMemo(() => ({
    payload, payloadError, provided: true, setPayload,
  }), [payload, payloadError, setPayload])

  return (
    <DivinedPayloadContext value={value}>
      {children}
    </DivinedPayloadContext>
  )
}

export const DivinedPayloadWithHandleInner: React.FC<PropsWithChildren> = ({ children }) => {
  const { payloadError } = useDivinedPayload()

  return (
    <ErrorRender
      error={payloadError
        ? {
            message: payloadError.message, schema: ModuleErrorSchema, sources: [],
          }
        : undefined}
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
