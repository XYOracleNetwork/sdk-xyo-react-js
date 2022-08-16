import { CardProps } from '@mui/material'
import { XyoPayload } from '@xyo-network/payload'

import { EmbedPluginVisibilityConfig, XyoEmbedPluginBase } from '../contexts'

export interface XyoEmbedPluginProps extends XyoEmbedPluginBase, CardProps {
  /** string for huri to resolve and payload for bypassing huri resolution */
  huriPayload?: string | XyoPayload
  validateSchema?: boolean
  hideElementsConfig?: EmbedPluginVisibilityConfig
}
