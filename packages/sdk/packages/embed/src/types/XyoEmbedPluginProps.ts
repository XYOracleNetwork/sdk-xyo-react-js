import { FlexBoxProps } from '@xylabs/react-flexbox'
import { XyoPayload } from '@xyo-network/payload'

import { EmbedPluginVisibilityConfig, XyoEmbedPluginBase } from '../contexts'

export interface XyoEmbedPluginProps extends XyoEmbedPluginBase, FlexBoxProps {
  /** string for huri to resolve and payload for bypassing huri resolution */
  onRefresh?: () => void
  huriPayload?: string | XyoPayload
  validateSchema?: boolean
  hideElementsConfig?: EmbedPluginVisibilityConfig
}
