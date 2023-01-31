import { XyoPayload } from '@xyo-network/payload-model'

import { EmbedPluginVisibilityConfig, XyoEmbedPluginBase } from '../contexts'

export interface XyoEmbedPluginProps extends XyoEmbedPluginBase {
  hideElementsConfig?: EmbedPluginVisibilityConfig
  huriPayload?: string | XyoPayload
  /** string for huri to resolve and payload for bypassing huri resolution */
  onRefresh?: () => void
  validateSchema?: boolean
}
