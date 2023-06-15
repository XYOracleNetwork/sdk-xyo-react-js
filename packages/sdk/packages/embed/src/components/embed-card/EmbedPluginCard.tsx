import { useTheme } from '@mui/material'
import { WithChildren } from '@xylabs/react-shared'

import { useRefreshPayload, useResolvePayload } from '../../contexts'
import { EmbedPluginProps } from '../../types'
import { EmbedPluginInner } from '../EmbedPlugin'
import { BusyCardProps, EmbedPluginCard } from './card'
import { EmbedCardApiErrorRenderer } from './error-handling'

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
export const EmbedPlugin = EmbedPluginCard
