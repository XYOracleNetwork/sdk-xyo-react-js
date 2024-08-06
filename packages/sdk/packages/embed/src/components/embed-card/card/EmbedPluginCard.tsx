import { CardContent } from '@mui/material'
import { FlexGrowRow } from '@xylabs/react-flexbox'
import { useListMode } from '@xyo-network/react-shared'

import { useEmbedPluginState, useResolvePayload } from '../../../contexts/index.js'
import { EmbedRenderSelect, ListModeSelectFormControl } from '../../controls/index.js'
import { BusyCard, BusyCardProps } from './BusyCard.js'
import { EmbedCardHeader } from './EmbedCardHeader.js'

export const EmbedPluginCard: React.FC<BusyCardProps> = ({ ...props }) => {
  const { payload } = useResolvePayload()
  const { activePlugin: ActivePlugin, plugins, hideElementsConfig } = useEmbedPluginState()
  const { listMode } = useListMode()
  const supportsListMode = ActivePlugin?.components?.box?.listModes?.length ?? 0 > 1

  return (
    <BusyCard {...props}>
      {hideElementsConfig?.hideCardHeader ? null : <EmbedCardHeader />}
      {/* Only show the row if the children are present */}
      {(plugins && plugins.length > 0) || supportsListMode
        ? (
            <FlexGrowRow columnGap={2} rowGap={2} flexWrap="wrap" pb={1}>
              {plugins && plugins.length > 1
                ? <EmbedRenderSelect />
                : null}
              {supportsListMode
                ? <ListModeSelectFormControl />
                : null}
            </FlexGrowRow>
          )
        : null}
      <CardContent sx={{ height: '100%' }}>
        {ActivePlugin
          ? <ActivePlugin.components.box.detailsBox payload={payload} {...(supportsListMode && { listMode })} />
          : null}
      </CardContent>
    </BusyCard>
  )
}
