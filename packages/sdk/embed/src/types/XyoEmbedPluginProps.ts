import { CardProps } from '@mui/material'

import { EmbedPluginVisibilityConfig, XyoEmbedPluginBase } from '../contexts'

export interface XyoEmbedPluginProps extends XyoEmbedPluginBase, CardProps {
  validateSchema?: boolean
  hideElementsConfig?: EmbedPluginVisibilityConfig
}
