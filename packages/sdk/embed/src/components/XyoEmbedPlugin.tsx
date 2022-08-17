import { FlexBoxProps } from '@xylabs/react-flexbox'
import { WithChildren } from '@xylabs/react-shared'
import { ListModeProvider } from '@xyo-network/react-shared'

import { RefreshPayloadProvider, ResolvePayloadProvider, ValidatePayloadProvider, XyoEmbedPluginProvider } from '../contexts'
import { XyoEmbedPluginProps } from '../types'
import { EmbedCardResolver, EmbedPluginCard, ValidatePayload, ValidatePlugins } from './embed-card'

export const XyoEmbedPlugin: React.FC<XyoEmbedPluginProps> = ({
  validateSchema,
  plugins = [],
  huriPayload,
  refreshTitle = '',
  timestampLabel = 'Data From',
  hideElementsConfig,
  embedPluginConfig,
  onRefresh,
  ...props
}) => {
  return (
    <XyoEmbedPluginProvider
      refreshTitle={refreshTitle}
      timestampLabel={timestampLabel}
      hideElementsConfig={hideElementsConfig}
      plugins={plugins}
      embedPluginConfig={embedPluginConfig}
    >
      <WithResolvers onRefresh={onRefresh} huriPayload={huriPayload} {...props}>
        <WithValidations validateSchema={validateSchema}>
          <ListModeProvider defaultListMode={embedPluginConfig?.listMode}>
            <EmbedPluginCard />
          </ListModeProvider>
        </WithValidations>
      </WithResolvers>
    </XyoEmbedPluginProvider>
  )
}

const WithValidations: React.FC<WithChildren<{ validateSchema?: boolean }>> = ({ children, validateSchema }) => {
  return (
    <ValidatePayloadProvider enabled={validateSchema}>
      <ValidatePlugins>
        <ValidatePayload>{children}</ValidatePayload>
      </ValidatePlugins>
    </ValidatePayloadProvider>
  )
}

interface WithResolversProps extends Pick<XyoEmbedPluginProps, 'onRefresh' | 'huriPayload'>, FlexBoxProps {}

const WithResolvers: React.FC<WithChildren<WithResolversProps>> = ({ children, onRefresh, huriPayload, ...props }) => {
  return (
    <RefreshPayloadProvider onRefresh={onRefresh}>
      <ResolvePayloadProvider huriPayload={huriPayload}>
        <EmbedCardResolver {...props}>{children}</EmbedCardResolver>
      </ResolvePayloadProvider>
    </RefreshPayloadProvider>
  )
}
