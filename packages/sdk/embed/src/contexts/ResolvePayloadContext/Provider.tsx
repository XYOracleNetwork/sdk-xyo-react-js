import { FlexBoxProps } from '@xylabs/react-flexbox'
import { useAsyncEffect, WithChildren } from '@xylabs/react-shared'
import { delay } from '@xylabs/sdk-js'
import { XyoApiError } from '@xyo-network/api'
import { Huri, XyoPayload } from '@xyo-network/payload'
import { useEffect, useState } from 'react'

import { useRefreshPayload } from '../RefreshPayloadContext'
import { ResolvePayloadContext } from './Context'
import { ResolvePayloadState } from './State'

export type ResolvePayloadProviderProps = Omit<ResolvePayloadState, 'provided'>

export const ResolvePayloadProvider: React.FC<WithChildren<ResolvePayloadProviderProps>> = ({ children, huriPayload }) => {
  const [payload, setPayload] = useState<XyoPayload>()
  const [huri, setHuri] = useState<string>()
  const { refreshPayload, setRefreshPayload, onRefresh } = useRefreshPayload()

  useEffect(() => {
    typeof huriPayload === 'string' ? setHuri(huriPayload) : undefined
    if (typeof huriPayload === 'object') {
      setPayload(huriPayload)
      setRefreshPayload?.(true)
    }
  }, [huriPayload, setRefreshPayload])

  const [notFound, setNotFound] = useState<boolean>()
  const [huriApiError, setHuriApiError] = useState<XyoApiError>()

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          setHuriApiError(e as XyoApiError)
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
    <ResolvePayloadContext.Provider value={{ huri, huriApiError, notFound, payload, provided: true, refreshHuri, setPayload }}>
      {children}
    </ResolvePayloadContext.Provider>
  )
}
