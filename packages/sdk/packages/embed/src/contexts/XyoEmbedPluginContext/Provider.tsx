import { WithChildren } from '@xylabs/react-shared'
import { XyoPayloadRenderPlugin } from '@xyo-network/react-payload-plugin'
import { useEffect, useState } from 'react'

import { XyoEmbedPluginContext } from './Context'
import { XyoEmbedPluginBase } from './State'

export type XyoEmbedPluginProviderProps = XyoEmbedPluginBase

/** Expose passed embed plugin props via context */
export const XyoEmbedPluginProvider: React.FC<WithChildren<XyoEmbedPluginProviderProps>> = ({
  children,
  refreshTitle,
  timestampLabel,
  hideElementsConfig,
  plugins,
  embedPluginConfig,
}) => {
  const [activePlugin, setActivePlugin] = useState<XyoPayloadRenderPlugin | undefined>(plugins ? plugins[0] : undefined)

  useEffect(() => {
    setActivePlugin(plugins ? plugins[0] : undefined)
  }, [plugins])

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
