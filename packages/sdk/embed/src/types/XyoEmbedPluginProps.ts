import { CardProps } from '@mui/material'

import { XyoEmbedPluginBase } from '../contexts'
import { EmbedPluginVisibilityConfig } from './EmbedPluginVisibility'

export interface XyoEmbedPluginProps extends XyoEmbedPluginBase, CardProps {
  validateSchema?: boolean
  hideElementsConfig?: EmbedPluginVisibilityConfig
}
