import { Card, CardContent, CardProps } from '@mui/material'
import { FlexGrowRow } from '@xylabs/react-flexbox'
import { useListMode } from '@xyo-network/react-shared'

import { useResolvePayload, useXyoEmbedPluginState } from '../../contexts'
import { EmbedRenderSelect, ListModeSelectFormControl } from '../controls'
import { EmbedCardHeader } from './EmbedCardHeader'

export const EmbedPluginCard: React.FC<CardProps> = (props) => {
  const { payload } = useResolvePayload()
  const { activePlugin: ActivePlugin, plugins, hideElementsConfig } = useXyoEmbedPluginState()
  const { listMode } = useListMode()

  return (
    <Card elevation={3} variant="elevation" {...props}>
      {hideElementsConfig?.hideCardHeader ? null : <EmbedCardHeader />}
      <FlexGrowRow columnGap={2} rowGap={2} flexWrap="wrap" justifyContent="center" pb={1}>
        {plugins && plugins.length > 1 ? <EmbedRenderSelect /> : null}
        {(ActivePlugin?.components?.box?.listModes?.length ?? 0) > 1 ? <ListModeSelectFormControl /> : null}
      </FlexGrowRow>
      <CardContent>{ActivePlugin ? <ActivePlugin.components.box.details payload={payload} listMode={listMode} /> : null}</CardContent>
    </Card>
  )
}
