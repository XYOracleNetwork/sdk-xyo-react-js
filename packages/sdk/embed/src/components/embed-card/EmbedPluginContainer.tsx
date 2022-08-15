import { Card, CardContent, CardProps } from '@mui/material'
import { FlexGrowRow } from '@xylabs/react-flexbox'

import { useXyoEmbedPluginState } from '../../contexts'
import { EmbedRenderSelect, ListModeSelectFormControl } from '../controls'
import { RenderComponent } from '../RenderComponent'
import { EmbedPluginVisibilityConfig } from '../XyoEmbedPluginProps'
import { EmbedCardHeader } from './EmbedCardHeader'

export interface EmbedPluginContainerProps extends CardProps {
  hideElementsConfig?: EmbedPluginVisibilityConfig
}

export const EmbedPluginContainer: React.FC<EmbedPluginContainerProps> = ({ hideElementsConfig, ...props }) => {
  const { activePlugin, payload, plugins } = useXyoEmbedPluginState()

  return (
    <Card elevation={3} variant="elevation" {...props}>
      <EmbedCardHeader hideElementsConfig={hideElementsConfig} />
      <FlexGrowRow columnGap={2} rowGap={2} flexWrap="wrap" justifyContent="center" pb={1}>
        {plugins && plugins.length > 1 ? <EmbedRenderSelect /> : null}
        {(activePlugin?.components?.box?.listModes?.length ?? 0) > 1 ? <ListModeSelectFormControl /> : null}
      </FlexGrowRow>
      <CardContent>
        <RenderComponent payload={payload} ActivePlugin={activePlugin} />
      </CardContent>
    </Card>
  )
}
