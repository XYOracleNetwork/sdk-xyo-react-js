import { useTheme } from '@mui/material'
import { WithChildren } from '@xylabs/react-shared'

import { useRefreshPayload, useResolvePayload } from '../../contexts'
import { XyoEmbedPluginProps } from '../../types'
import { XyoEmbedPluginInner } from '../XyoEmbedPlugin'
import { BusyCardProps, EmbedPluginCard } from './card'
import { EmbedCardApiErrorRenderer } from './error-handling'

export interface XyoEmbedPluginCardProps extends WithChildren, XyoEmbedPluginProps, BusyCardProps {}

export const XyoEmbedPluginCard: React.FC<XyoEmbedPluginCardProps> = ({ children, ...props }) => {
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
    <XyoEmbedPluginInner
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
      <XyoEmbedPluginCardInner {...busyCardProps} />
      {children}
    </XyoEmbedPluginInner>
  )
}

export const XyoEmbedPluginCardInner: React.FC<BusyCardProps> = (props) => {
  const { payload, huriApiError } = useResolvePayload()
  const { refreshPayload } = useRefreshPayload()
  const theme = useTheme()

  return (
    <EmbedCardApiErrorRenderer apiError={huriApiError}>
      <EmbedPluginCard
        busy={Boolean(!refreshPayload && payload)}
        busyVariantProps={{ style: { alignItems: 'start', paddingTop: theme.spacing(2), zIndex: 2 } }}
        {...props}
      />
    </EmbedCardApiErrorRenderer>
  )
}

/** @deprecated - use XyoEmbedPluginCard and use CardProps instead of FlexBoxProps */
export const XyoEmbedPlugin = XyoEmbedPluginCard
