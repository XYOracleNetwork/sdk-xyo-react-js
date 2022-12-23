import { XyoPayload } from '@xyo-network/payload-model'

import { EmbedPluginVisibilityConfig, XyoEmbedPluginBase } from '../contexts'

export interface XyoEmbedPluginProps extends XyoEmbedPluginBase {
  /** string for huri to resolve and payload for bypassing huri resolution */
  onRefresh?: () => void
  huriPayload?: string | XyoPayload
  validateSchema?: boolean
  hideElementsConfig?: EmbedPluginVisibilityConfig
}
