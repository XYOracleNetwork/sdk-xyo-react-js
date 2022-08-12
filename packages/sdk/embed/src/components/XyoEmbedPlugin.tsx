import { ListModeProvider } from '@xyo-network/react-shared'

import { ValidatePayloadProvider, XyoEmbedPluginProvider } from '../contexts'
import { EmbedPluginContainer, ValidatePayload, ValidatePlugins } from './embed-card'
import { XyoEmbedPluginProps } from './XyoEmbedPluginProps'

export const XyoEmbedPlugin: React.FC<XyoEmbedPluginProps> = ({
  validateSchema,
  plugins = [],
  huri,
  refreshTitle = '',
  timestampLabel = 'Data From',
  ...props
}) => {
  return (
    <XyoEmbedPluginProvider refreshTitle={refreshTitle} timestampLabel={timestampLabel} plugins={plugins} huri={huri}>
      <ValidatePayloadProvider enabled={validateSchema}>
        <ListModeProvider>
          <ValidatePlugins>
            <ValidatePayload>
              <EmbedPluginContainer {...props} />
            </ValidatePayload>
          </ValidatePlugins>
        </ListModeProvider>
      </ValidatePayloadProvider>
    </XyoEmbedPluginProvider>
  )
}
