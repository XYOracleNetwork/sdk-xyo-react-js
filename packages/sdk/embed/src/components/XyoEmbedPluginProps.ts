import { CardProps } from '@mui/material'
import { XyoPayloadRenderPlugin } from '@xyo-network/react-payload-plugin'

export interface XyoEmbedPluginProps extends CardProps {
  plugins?: XyoPayloadRenderPlugin[]
  huri?: string
  refreshTitle?: string
  timestampLabel?: string
  validateSchema?: boolean
}
