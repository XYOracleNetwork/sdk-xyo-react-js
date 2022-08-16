import { FlexBoxProps, FlexCol } from '@xylabs/react-flexbox'
import { useAsyncEffect, WithChildren } from '@xylabs/react-shared'
import { delay } from '@xylabs/sdk-js'
import { XyoApiError } from '@xyo-network/api'
import { Huri, XyoPayload } from '@xyo-network/payload'
import { XyoApiErrorRender } from '@xyo-network/react-auth-service'
import { ResultLoader } from '@xyo-network/react-webapp'
import { useEffect, useState } from 'react'

import { ResolvePayloadContext } from './Context'
import { ResolvePayloadState } from './State'

export type ResolvePayloadProviderProps = Omit<ResolvePayloadState, 'provided' & FlexBoxProps>

export const ResolvePayloadProvider: React.FC<WithChildren<ResolvePayloadProviderProps>> = ({ children, huriPayload, ...props }) => {
  const [payload, setPayload] = useState<XyoPayload>()
  const [huri, setHuri] = useState<string>()

  useEffect(() => {
    typeof huriPayload === 'string' ? setHuri(huriPayload) : undefined
    if (typeof huriPayload === 'object') {
      setPayload(huriPayload)
      setRefreshPayload(1)
    }
  }, [huriPayload])

  const [notFound, setNotFound] = useState<boolean>()
  const [huriApiError, setHuriApiError] = useState<XyoApiError>()
  const [refreshPayload, setRefreshPayload] = useState(0)

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
            setRefreshPayload(1)
          }
        } catch (e) {
          setHuriApiError(e as XyoApiError)
        }
      }
    },
    [huri, payload, refreshPayload],
  )

  const refreshHuri = () => {
    if (huri) {
      setRefreshPayload(0)
    }
  }

  return (
    <ResolvePayloadContext.Provider value={{ huri, huriApiError, notFound, payload, provided: true, refreshHuri, refreshPayload, setPayload }}>
      <ResultLoader searchResult={payload} notFound={!!notFound} apiError={huriApiError}>
        <XyoApiErrorRender apiError={huriApiError}>
          <FlexCol busy={Boolean(!refreshPayload && payload)} {...props}>
            {children}
          </FlexCol>
        </XyoApiErrorRender>
      </ResultLoader>
    </ResolvePayloadContext.Provider>
  )
}
