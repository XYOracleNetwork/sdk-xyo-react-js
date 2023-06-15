import { PayloadRenderPlugin } from '@xyo-network/react-payload-plugin'
import { ContextExState, ListMode } from '@xyo-network/react-shared'
import { Dispatch, SetStateAction } from 'react'

export interface EmbedPluginVisibilityConfig {
  hideAvatar?: boolean
  hideCardActions?: boolean
  hideCardHeader?: boolean
  hideErrorDetails?: boolean
  hideRefreshButton?: boolean
  hideTimestamp?: boolean
  hideTitle?: boolean
}

/**
 * Extend for custom plugin configuration
 */
export interface PluginConfig {
  listMode?: ListMode
}

export interface EmbedPluginBase {
  /** EmbedPlugin component configuration */
  embedPluginConfig?: PluginConfig
  hideElementsConfig?: EmbedPluginVisibilityConfig
  /** @deprecated use huriPayload */
  huri?: string
  plugins?: PayloadRenderPlugin[]
  refreshTitle?: string
  timestampLabel?: string
}

export interface EmbedPluginState extends EmbedPluginBase, ContextExState {
  activePlugin?: PayloadRenderPlugin
  setActivePlugin?: Dispatch<SetStateAction<PayloadRenderPlugin | undefined>>
}
