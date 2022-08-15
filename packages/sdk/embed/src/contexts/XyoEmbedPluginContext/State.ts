import { XyoPayload } from '@xyo-network/payload'
import { XyoPayloadRenderPlugin } from '@xyo-network/react-payload-plugin'
import { ContextExState, ListMode } from '@xyo-network/react-shared'
import { Dispatch, SetStateAction } from 'react'

export interface EmbedPluginVisibilityConfig {
  hideAvatar?: boolean
  hideTitle?: boolean
  hideRefreshButton?: boolean
  hideTimestamp?: boolean
  hideCardActions?: boolean
  hideCardHeader?: boolean
}

export interface PluginConfig {
  listMode?: ListMode
  [key: string]: undefined | unknown
}

export interface XyoEmbedPluginBase {
  plugins?: XyoPayloadRenderPlugin[]
  pluginConfig?: PluginConfig
  huri?: string
  refreshTitle?: string
  timestampLabel?: string
  hideElementsConfig?: EmbedPluginVisibilityConfig
}

export interface XyoEmbedPluginState extends XyoEmbedPluginBase, ContextExState {
  activePlugin?: XyoPayloadRenderPlugin
  setActivePlugin?: Dispatch<SetStateAction<XyoPayloadRenderPlugin | undefined>>
  payload?: XyoPayload
  refreshHuri?: () => void
}
