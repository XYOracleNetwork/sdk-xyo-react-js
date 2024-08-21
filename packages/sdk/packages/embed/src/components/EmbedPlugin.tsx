import type { FlexBoxProps } from '@xylabs/react-flexbox'
import type { WithChildren } from '@xylabs/react-shared'
import { ErrorBoundary, ListModeProvider } from '@xyo-network/react-shared'
import React from 'react'

import {
  EmbedPluginProvider, RefreshPayloadProvider, ResolvePayloadProvider, ValidatePayloadProvider,
} from '../contexts/index.ts'
import type { EmbedPluginProps } from '../types/index.ts'
import { EmbedResolver } from './EmbedResolver.tsx'
import { ValidatePayloadAlert, ValidatePluginsAlert } from './validation-alerts/index.ts'

export const EmbedPluginInner: React.FC<WithChildren<EmbedPluginProps>> = ({
  validateSchema,
  plugins,
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
      <EmbedPluginProvider
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
      </EmbedPluginProvider>
    </ErrorBoundary>
  )
}

interface WithResolversProps extends Pick<EmbedPluginProps, 'onRefresh' | 'huriPayload'>, FlexBoxProps {}

const WithResolvers: React.FC<WithChildren<WithResolversProps>> = ({
  children, onRefresh, huriPayload,
}) => {
  return (
    <RefreshPayloadProvider onRefresh={onRefresh}>
      <ResolvePayloadProvider huriPayload={huriPayload}>
        <EmbedResolver>{children}</EmbedResolver>
      </ResolvePayloadProvider>
    </RefreshPayloadProvider>
  )
}

const WithValidators: React.FC<WithChildren<{ validateSchema?: boolean }>> = ({
  children, validateSchema,
}) => {
  return (
    <ValidatePayloadProvider enabled={validateSchema}>
      <ValidatePluginsAlert>
        <ValidatePayloadAlert>{children}</ValidatePayloadAlert>
      </ValidatePluginsAlert>
    </ValidatePayloadProvider>
  )
}
