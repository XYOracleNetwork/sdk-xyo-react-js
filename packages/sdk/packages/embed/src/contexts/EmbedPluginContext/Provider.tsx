import { useResetState } from '@xylabs/react-hooks'
import type { WithChildren } from '@xylabs/react-shared'
import React from 'react'

import { EmbedPluginContext } from './Context.ts'
import type { EmbedPluginBase } from './State.ts'

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
  const [activePlugin, setActivePlugin] = useResetState(plugins ? plugins[0] : undefined)

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
