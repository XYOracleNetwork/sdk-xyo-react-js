import RefreshIcon from '@mui/icons-material/Refresh'
import { Avatar, Card, CardContent, CardHeader, CardProps, Chip, Theme } from '@mui/material'
import { FlexGrowRow, FlexRow } from '@xylabs/react-flexbox'

import { useXyoEmbedPluginState } from '../../contexts'
import { EmbedRenderSelect, ListModeSelectFormControl } from '../controls'
import { RenderComponent } from '../RenderComponent'
import { EmbedMenu } from './menu'

export interface EmbedPluginContainerProps extends CardProps {
  hideJsonButton?: boolean
}

export const EmbedPluginContainer: React.FC<EmbedPluginContainerProps> = ({ hideJsonButton, ...props }) => {
  const { activePlugin, payload, timestampLabel, refreshHuri, plugins } = useXyoEmbedPluginState()
  return (
    <Card elevation={3} variant="elevation" {...props}>
      <CardHeader
        sx={{ flexWrap: 'wrap', rowGap: 1 }}
        avatar={
          <Avatar sx={{ bgcolor: (theme: Theme) => theme.palette.primary.main }} aria-label={activePlugin?.name}>
            {activePlugin?.name?.charAt(0)}
          </Avatar>
        }
        action={
          <FlexRow>
            {payload?.timestamp ? (
              <Chip
                avatar={<RefreshIcon />}
                clickable
                onClick={refreshHuri}
                label={`${timestampLabel} ${new Date(payload.timestamp).toLocaleString()}`}
              />
            ) : null}
            {hideJsonButton ? null : <EmbedMenu />}
          </FlexRow>
        }
        title={activePlugin?.name}
      />
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
