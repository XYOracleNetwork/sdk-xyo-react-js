import { CardProps } from '@mui/material'
import { XyoPayloadRenderPlugin } from '@xyo-network/react-payload-plugin'

export interface EmbedPluginVisibilityConfig {
  hideAvatar?: boolean
  hideTitle?: boolean
  hideRefreshButton?: boolean
  hideTimestamp?: boolean
  hideCardActions?: boolean
  hideCardHeader?: boolean
}

export interface XyoEmbedPluginProps extends CardProps {
  plugins?: XyoPayloadRenderPlugin[]
  huri?: string
  refreshTitle?: string
  timestampLabel?: string
  validateSchema?: boolean
  hideElementsConfig?: EmbedPluginVisibilityConfig
}
