import { FlexBoxProps } from '@xylabs/react-flexbox'
import { useAsyncEffect, WithChildren } from '@xylabs/react-shared'
import { XyoApiError } from '@xyo-network/api'
import { Huri, XyoPayload } from '@xyo-network/payload'
import { XyoApiErrorRender } from '@xyo-network/react-auth-service'
import { XyoPayloadRenderPlugin } from '@xyo-network/react-payload-plugin'
import { ResultLoader } from '@xyo-network/react-webapp'
import { useState } from 'react'

import { XyoEmbedPluginContext } from './Context'

export interface XyoEmbedPluginProviderProps extends FlexBoxProps {
  plugins?: XyoPayloadRenderPlugin[]
  huri?: string
  refreshTitle?: string
  timestampLabel?: string
}

export const XyoEmbedPluginProvider: React.FC<WithChildren<XyoEmbedPluginProviderProps>> = ({
  children,
  refreshTitle,
  timestampLabel,
  huri,
  plugins,
  ...props
}) => {
  const [payload, setPayload] = useState<XyoPayload>()
  const [notFound, setNotFound] = useState<boolean>()
  const [huriApiError, setHuriApiError] = useState<XyoApiError>()
  const [activePlugin, setActivePlugin] = useState<XyoPayloadRenderPlugin | undefined>(plugins ? plugins[0] : undefined)

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async (mounted) => {
      if (!payload && huri) {
        try {
          const huriInstance = new Huri(huri)
          const result = await huriInstance.fetch()

          if (mounted()) {
            if (result === null) setNotFound(true)
            if (payload === undefined) setPayload(result)
          }
        } catch (e) {
          setHuriApiError(e as XyoApiError)
        }
      }
    },
    [huri, payload],
  )

  const refreshHuri = () => {
    setHuriApiError(undefined)
    setNotFound(undefined)
    setPayload(undefined)
  }

  return (
    <XyoEmbedPluginContext.Provider value={{ activePlugin, payload, refreshHuri, refreshTitle, setActivePlugin, timestampLabel }}>
      <ResultLoader searchResult={payload} notFound={!!notFound} apiError={huriApiError}>
        <XyoApiErrorRender apiError={huriApiError} {...props}>
          {children}
        </XyoApiErrorRender>
      </ResultLoader>
    </XyoEmbedPluginContext.Provider>
  )
}
