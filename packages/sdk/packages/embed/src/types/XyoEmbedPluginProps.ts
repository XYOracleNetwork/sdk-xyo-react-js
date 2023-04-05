import { Payload } from '@xyo-network/payload-model'

import { EmbedPluginVisibilityConfig, XyoEmbedPluginBase } from '../contexts'

export interface XyoEmbedPluginProps extends XyoEmbedPluginBase {
  hideElementsConfig?: EmbedPluginVisibilityConfig
  huriPayload?: string | Payload
  /** string for huri to resolve and payload for bypassing huri resolution */
  onRefresh?: () => void
  validateSchema?: boolean
}
