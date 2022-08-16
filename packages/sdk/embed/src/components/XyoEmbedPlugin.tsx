import { ListModeProvider } from '@xyo-network/react-shared'

import { ResolvePayloadProvider, ValidatePayloadProvider, XyoEmbedPluginProvider } from '../contexts'
import { XyoEmbedPluginProps } from '../types'
import { EmbedPluginContainer, ValidatePayload, ValidatePlugins } from './embed-card'

export const XyoEmbedPlugin: React.FC<XyoEmbedPluginProps> = ({
  validateSchema,
  plugins = [],
  huriPayload,
  refreshTitle = '',
  timestampLabel = 'Data From',
  hideElementsConfig,
  embedPluginConfig,
  ...props
}) => {
  return (
    <ResolvePayloadProvider huriPayload={huriPayload} {...props}>
      <XyoEmbedPluginProvider
        refreshTitle={refreshTitle}
        timestampLabel={timestampLabel}
        hideElementsConfig={hideElementsConfig}
        plugins={plugins}
        embedPluginConfig={embedPluginConfig}
      >
        <ValidatePayloadProvider enabled={validateSchema}>
          <ListModeProvider defaultListMode={embedPluginConfig?.listMode}>
            <ValidatePlugins>
              <ValidatePayload>
                <EmbedPluginContainer {...props} />
              </ValidatePayload>
            </ValidatePlugins>
          </ListModeProvider>
        </ValidatePayloadProvider>
      </XyoEmbedPluginProvider>
    </ResolvePayloadProvider>
  )
}
