import { FlexBoxProps } from '@xylabs/react-flexbox'
import { XyoPayloadRenderPlugin } from '@xyo-network/react-payload-plugin'

export interface XyoEmbedPluginProps extends FlexBoxProps {
  plugins?: XyoPayloadRenderPlugin[]
  huri?: string
  refreshTitle?: string
  timestampLabel?: string
}
