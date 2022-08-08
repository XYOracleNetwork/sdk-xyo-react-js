import RefreshIcon from '@mui/icons-material/Refresh'
import { Avatar, CardContent, CardHeader, Link, Theme } from '@mui/material'
import { FlexGrowRow } from '@xylabs/react-flexbox'
import { TypographyEx } from '@xyo-network/react-shared'
import { Fragment } from 'react'

import { useXyoEmbedPluginState } from '../../contexts'
import { EmbedRenderSelect, ListModeSelectFormControl } from '../controls'
import { RenderComponent } from '../RenderComponent'
import { EmbedCardEx } from './EmbedCardEx'

export const EmbedPluginContainer: React.FC = () => {
  const { activePlugin, payload, timestampLabel, refreshHuri, refreshTitle, plugins } = useXyoEmbedPluginState()
  return (
    <EmbedCardEx elevation={3}>
      <CardHeader
        sx={{ flexWrap: 'wrap', rowGap: 1 }}
        avatar={
          <Avatar sx={{ bgcolor: (theme: Theme) => theme.palette.primary.main }} aria-label={activePlugin?.name}>
            {activePlugin?.name?.charAt(0)}
          </Avatar>
        }
        action={
          <Fragment>
            {payload?.timestamp ? (
              <FlexGrowRow>
                <TypographyEx variant="caption">{`${timestampLabel} ${new Date(payload.timestamp).toLocaleString()}`}</TypographyEx>
                <Link onClick={refreshHuri} sx={{ cursor: 'pointer' }} title={refreshTitle}>
                  <RefreshIcon sx={{ height: (theme: Theme) => theme.spacing(1), position: 'relative', top: '2px' }} />
                </Link>
              </FlexGrowRow>
            ) : (
              <></>
            )}
          </Fragment>
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
    </EmbedCardEx>
  )
}
