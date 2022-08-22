import { FlexBoxProps } from '@xylabs/react-flexbox'
import { WithChildren } from '@xylabs/react-shared'
import { ErrorBoundary, ListModeProvider } from '@xyo-network/react-shared'

import { RefreshPayloadProvider, ResolvePayloadProvider, ValidatePayloadProvider, XyoEmbedPluginProvider } from '../contexts'
import { XyoEmbedPluginProps } from '../types'
import { EmbedCardResolverFlexBox, EmbedErrorCard, EmbedPluginCard, ValidatePayloadAlert, ValidatePluginsAlert } from './embed-card'

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
    <ErrorBoundary fallbackWithError={(error) => <EmbedErrorCard hideErrorDetails={hideElementsConfig?.hideErrorDetails} error={error} />}>
      <XyoEmbedPluginProvider
        refreshTitle={refreshTitle}
        timestampLabel={timestampLabel}
        hideElementsConfig={hideElementsConfig}
        plugins={plugins}
        embedPluginConfig={embedPluginConfig}
      >
        <WithResolvers onRefresh={onRefresh} huriPayload={huriPayload} {...props}>
          <WithValidators validateSchema={validateSchema}>
            <ListModeProvider defaultListMode={embedPluginConfig?.listMode}>
              <EmbedPluginCard />
            </ListModeProvider>
          </WithValidators>
        </WithResolvers>
      </XyoEmbedPluginProvider>
    </ErrorBoundary>
  )
}

interface WithResolversProps extends Pick<XyoEmbedPluginProps, 'onRefresh' | 'huriPayload'>, FlexBoxProps {}

const WithResolvers: React.FC<WithChildren<WithResolversProps>> = ({ children, onRefresh, huriPayload, ...props }) => {
  return (
    <RefreshPayloadProvider onRefresh={onRefresh}>
      <ResolvePayloadProvider huriPayload={huriPayload}>
        <EmbedCardResolverFlexBox {...props}>{children}</EmbedCardResolverFlexBox>
      </ResolvePayloadProvider>
    </RefreshPayloadProvider>
  )
}

const WithValidators: React.FC<WithChildren<{ validateSchema?: boolean }>> = ({ children, validateSchema }) => {
  return (
    <ValidatePayloadProvider enabled={validateSchema}>
      <ValidatePluginsAlert>
        <ValidatePayloadAlert>{children}</ValidatePayloadAlert>
      </ValidatePluginsAlert>
    </ValidatePayloadProvider>
  )
}
