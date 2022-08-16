import { WithChildren } from '@xylabs/react-shared'
import { XyoPayload } from '@xyo-network/payload'
import { XyoPayloadRenderPlugin } from '@xyo-network/react-payload-plugin'
import { useState } from 'react'

import { XyoEmbedPluginContext } from './Context'
import { XyoEmbedPluginBase } from './State'

export interface XyoEmbedPluginProviderProps extends XyoEmbedPluginBase {
  /** string for huri to resolve and payload for bypassing huri resolution */
  huriPayload?: string | XyoPayload
}

/** Expose passed embed plugin props and payload via context */
export const XyoEmbedPluginProvider: React.FC<WithChildren<XyoEmbedPluginProviderProps>> = ({
  children,
  refreshTitle,
  timestampLabel,
  hideElementsConfig,
  plugins,
  embedPluginConfig,
}) => {
  const [activePlugin, setActivePlugin] = useState<XyoPayloadRenderPlugin | undefined>(plugins ? plugins[0] : undefined)

  return (
    <XyoEmbedPluginContext.Provider
      value={{
        activePlugin,
        embedPluginConfig,
        hideElementsConfig,
        provided: true,
        refreshTitle,
        setActivePlugin,
        timestampLabel,
      }}
    >
      {children}
    </XyoEmbedPluginContext.Provider>
  )
}
