import { useTheme } from '@mui/material'
import { WithChildren } from '@xylabs/react-shared'
import React from 'react'

import { useRefreshPayload, useResolvePayload } from '../../contexts/index.js'
import { EmbedPluginProps } from '../../types/index.js'
import { EmbedPluginInner } from '../EmbedPlugin.js'
import { BusyCardProps, EmbedPluginCard } from './card/index.js'
import { EmbedCardApiErrorRenderer } from './error-handling/index.js'

export interface EmbedPluginCardProps extends WithChildren, EmbedPluginProps, BusyCardProps {}

export const ApiEmbedPluginCard: React.FC<EmbedPluginCardProps> = ({ children, ...props }) => {
  const {
    validateSchema,
    plugins = [],
    huriPayload,
    refreshTitle = '',
    timestampLabel = 'Data From',
    hideElementsConfig,
    embedPluginConfig,
    onRefresh,
    ...busyCardProps
  } = props

  return (
    <EmbedPluginInner
      {...{
        embedPluginConfig,
        hideElementsConfig,
        huriPayload,
        onRefresh,
        plugins,
        refreshTitle,
        timestampLabel,
        validateSchema,
      }}
    >
      <EmbedPluginCardInner {...busyCardProps} />
      {children}
    </EmbedPluginInner>
  )
}

export const EmbedPluginCardInner: React.FC<BusyCardProps> = (props) => {
  const { payload, huriError } = useResolvePayload()
  const { refreshPayload } = useRefreshPayload()
  const theme = useTheme()

  return (
    <EmbedCardApiErrorRenderer xyoError={huriError}>
      <EmbedPluginCard
        elevation={3}
        variant="elevation"
        busy={Boolean(!refreshPayload && payload)}
        busyVariantProps={{ style: { alignItems: 'start', paddingTop: theme.spacing(2), zIndex: 2 } }}
        sx={{ position: 'relative' }}
        {...props}
      />
    </EmbedCardApiErrorRenderer>
  )
}

/** @deprecated - use EmbedPluginCard and use CardProps instead of FlexBoxProps */

export { EmbedPluginCard as EmbedPlugin } from './card/index.js'
