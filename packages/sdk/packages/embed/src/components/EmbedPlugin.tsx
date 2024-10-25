import { ErrorBoundary } from '@xylabs/react-error'
import type { FlexBoxProps } from '@xylabs/react-flexbox'
import { ListModeProvider } from '@xyo-network/react-shared'
import type { PropsWithChildren } from 'react'
import React from 'react'

import {
  EmbedPluginProvider, RefreshPayloadProvider, ResolvePayloadProvider, ValidatePayloadProvider,
} from '../contexts/index.ts'
import type { EmbedPluginProps } from '../types/index.ts'
import { EmbedResolver } from './EmbedResolver.tsx'
import { ValidatePayloadAlert, ValidatePluginsAlert } from './validation-alerts/index.ts'

export const EmbedPluginInner: React.FC<PropsWithChildren<EmbedPluginProps>> = ({
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

const WithResolvers: React.FC<PropsWithChildren<WithResolversProps>> = ({
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

const WithValidators: React.FC<PropsWithChildren<{ validateSchema?: boolean }>> = ({ children, validateSchema }) => {
  return (
    <ValidatePayloadProvider enabled={validateSchema}>
      <ValidatePluginsAlert>
        <ValidatePayloadAlert>{children}</ValidatePayloadAlert>
      </ValidatePluginsAlert>
    </ValidatePayloadProvider>
  )
}
