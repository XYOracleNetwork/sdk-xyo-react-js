import { WithChildren } from '@xylabs/react-shared'
import { PayloadRenderPlugin } from '@xyo-network/react-payload-plugin'
import { useEffect, useState } from 'react'

import { EmbedPluginContext } from './Context'
import { EmbedPluginBase } from './State'

export type EmbedPluginProviderProps = EmbedPluginBase

/** Expose passed embed plugin props via context */
export const EmbedPluginProvider: React.FC<WithChildren<EmbedPluginProviderProps>> = ({
  children,
  refreshTitle,
  timestampLabel,
  hideElementsConfig,
  plugins,
  embedPluginConfig,
}) => {
  const [activePlugin, setActivePlugin] = useState<PayloadRenderPlugin | undefined>(plugins ? plugins[0] : undefined)

  useEffect(() => {
    setActivePlugin(plugins ? plugins[0] : undefined)
  }, [plugins])

  return (
    <EmbedPluginContext.Provider
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
    </EmbedPluginContext.Provider>
  )
}
