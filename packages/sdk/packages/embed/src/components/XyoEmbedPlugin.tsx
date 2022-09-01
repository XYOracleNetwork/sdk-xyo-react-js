import { FlexBoxProps } from '@xylabs/react-flexbox'
import { WithChildren } from '@xylabs/react-shared'
import { ErrorBoundary, ListModeProvider } from '@xyo-network/react-shared'

import { RefreshPayloadProvider, ResolvePayloadProvider, ValidatePayloadProvider, XyoEmbedPluginProvider } from '../contexts'
import { XyoEmbedPluginProps } from '../types'
import { EmbedResolver } from './EmbedResolver'
import { ValidatePayloadAlert, ValidatePluginsAlert } from './validation-alerts'

export const XyoEmbedPluginInner: React.FC<WithChildren<XyoEmbedPluginProps>> = ({
  validateSchema,
  plugins = [],
  huriPayload,
  refreshTitle = '',
  timestampLabel = 'Data From',
  hideElementsConfig,
  embedPluginConfig,
  onRefresh,
  children,
}) => {
  return (
    <ErrorBoundary>
      <XyoEmbedPluginProvider
        refreshTitle={refreshTitle}
        timestampLabel={timestampLabel}
        hideElementsConfig={hideElementsConfig}
        plugins={plugins}
        embedPluginConfig={embedPluginConfig}
      >
        <WithResolvers onRefresh={onRefresh} huriPayload={huriPayload}>
          <WithValidators validateSchema={validateSchema}>
            <ListModeProvider defaultListMode={embedPluginConfig?.listMode}>{children}</ListModeProvider>
          </WithValidators>
        </WithResolvers>
      </XyoEmbedPluginProvider>
    </ErrorBoundary>
  )
}

interface WithResolversProps extends Pick<XyoEmbedPluginProps, 'onRefresh' | 'huriPayload'>, FlexBoxProps {}

const WithResolvers: React.FC<WithChildren<WithResolversProps>> = ({ children, onRefresh, huriPayload }) => {
  return (
    <RefreshPayloadProvider onRefresh={onRefresh}>
      <ResolvePayloadProvider huriPayload={huriPayload}>
        <EmbedResolver>{children}</EmbedResolver>
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
