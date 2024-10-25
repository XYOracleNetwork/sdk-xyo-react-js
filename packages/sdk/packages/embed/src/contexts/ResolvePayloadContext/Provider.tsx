/* eslint-disable @eslint-react/hooks-extra/no-direct-set-state-in-use-effect */
import { delay } from '@xylabs/delay'
import { useAsyncEffect } from '@xylabs/react-async-effect'
import { Huri } from '@xyo-network/huri'
import type { ModuleError, Payload } from '@xyo-network/payload-model'
import { ModuleErrorSchema } from '@xyo-network/payload-model'
import type { PropsWithChildren } from 'react'
import React, { useEffect, useState } from 'react'

import { useRefreshPayload } from '../RefreshPayloadContext/index.ts'
import { ResolvePayloadContext } from './Context.ts'
import type { ResolvePayloadState } from './State.ts'

export type ResolvePayloadProviderProps = Omit<ResolvePayloadState, 'provided'>

export const ResolvePayloadProvider: React.FC<PropsWithChildren<ResolvePayloadProviderProps>> = ({ children, huriPayload }) => {
  const [payload, setPayload] = useState<Payload>()
  const [huri, setHuri] = useState<string>()
  const {
    refreshPayload, setRefreshPayload, onRefresh,
  } = useRefreshPayload()

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    typeof huriPayload === 'string' ? setHuri(huriPayload) : undefined
    if (typeof huriPayload === 'object') {
      setPayload(huriPayload)
      setRefreshPayload?.(true)
    }
  }, [huriPayload, setRefreshPayload])

  const [notFound, setNotFound] = useState<boolean>()
  const [huriError, setHuriError] = useState<ModuleError>()

  useAsyncEffect(
    async (mounted) => {
      if (huri && !refreshPayload) {
        try {
          const huriInstance = new Huri(huri)
          const result = await huriInstance.fetch()
          // ensure the busy state can stay for a moment to avoid flashing too quickly
          await delay(500)

          if (mounted()) {
            setNotFound(result === null)
            setPayload(result)
            setRefreshPayload?.(true)
          }
        } catch (e) {
          const error = e as Error
          setHuriError({
            message: error.message, schema: ModuleErrorSchema, sources: [],
          })
        }
      }
    },
    [huri, payload, refreshPayload, setRefreshPayload],
  )

  const refreshHuri = () => {
    onRefresh?.()
    if (huri) {
      setRefreshPayload?.(false)
    }
  }

  return (
    // eslint-disable-next-line @eslint-react/no-unstable-context-value
    <ResolvePayloadContext.Provider value={{
      huri, huriError, notFound, payload, provided: true, refreshHuri, setPayload,
    }}
    >
      {children}
    </ResolvePayloadContext.Provider>
  )
}
