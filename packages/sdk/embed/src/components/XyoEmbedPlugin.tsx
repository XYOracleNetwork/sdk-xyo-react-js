import { ListModeProvider } from '@xyo-network/react-shared'

import { ValidatePayloadProvider, XyoEmbedPluginProvider } from '../contexts'
import { XyoEmbedPluginProps } from '../types'
import { EmbedPluginContainer, ValidatePayload, ValidatePlugins } from './embed-card'

export const XyoEmbedPlugin: React.FC<XyoEmbedPluginProps> = ({
  validateSchema,
  plugins = [],
  huri,
  refreshTitle = '',
  timestampLabel = 'Data From',
  hideElementsConfig,
  pluginConfig,
  ...props
}) => {
  return (
    <XyoEmbedPluginProvider
      refreshTitle={refreshTitle}
      timestampLabel={timestampLabel}
      plugins={plugins}
      huri={huri}
      pluginConfig={pluginConfig}
      hideElementsConfig={hideElementsConfig}
    >
      <ValidatePayloadProvider enabled={validateSchema}>
        <ListModeProvider defaultListMode={pluginConfig?.listMode}>
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
