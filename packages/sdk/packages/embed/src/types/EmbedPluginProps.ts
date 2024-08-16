import type { Payload } from '@xyo-network/payload-model'

import type { EmbedPluginBase, EmbedPluginVisibilityConfig } from '../contexts/index.ts'

export interface EmbedPluginProps extends EmbedPluginBase {
  hideElementsConfig?: EmbedPluginVisibilityConfig
  huriPayload?: string | Payload
  /** string for huri to resolve and payload for bypassing huri resolution */
  onRefresh?: () => void
  validateSchema?: boolean
}
