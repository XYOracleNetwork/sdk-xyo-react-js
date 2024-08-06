import { WithChildren } from '@xylabs/react-shared'
import { PayloadRenderPlugin } from '@xyo-network/react-payload-plugin'
import React, { useEffect, useState } from 'react'

import { EmbedPluginContext } from './Context.js'
import { EmbedPluginBase } from './State.js'

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
      // eslint-disable-next-line @eslint-react/no-unstable-context-value
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
