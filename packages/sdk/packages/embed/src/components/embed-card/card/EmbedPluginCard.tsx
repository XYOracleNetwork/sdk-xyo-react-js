import { CardContent } from '@mui/material'
import { FlexGrowRow } from '@xylabs/react-flexbox'
import { isTruthy } from '@xylabs/sdk-js'
import { useListMode } from '@xyo-network/react-shared'
import React from 'react'

import {
  useEmbedPluginState, usePluginProps, useResolvePayload,
} from '../../../contexts/index.ts'
import { EmbedRenderSelect, ListModeSelectFormControl } from '../../controls/index.ts'
import type { BusyCardProps } from './BusyCard.tsx'
import { BusyCard } from './BusyCard.tsx'
import { EmbedCardHeader } from './EmbedCardHeader.tsx'

export const EmbedPluginCard: React.FC<BusyCardProps> = ({ ...props }) => {
  const { payload } = useResolvePayload()
  const {
    activePlugin: ActivePlugin, plugins, hideElementsConfig,
  } = useEmbedPluginState()
  const { listMode } = useListMode()
  const { pluginProps } = usePluginProps()
  const supportsListMode = isTruthy(ActivePlugin?.components?.box?.listModes?.length) ? true : false

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
          ? <ActivePlugin.components.box.detailsBox payload={payload} {...pluginProps} {...(supportsListMode && { listMode })} />
          : null}
      </CardContent>
    </BusyCard>
  )
}
