import RefreshIcon from '@mui/icons-material/Refresh'
import { Avatar, CardHeader, CardHeaderProps, Chip, Theme } from '@mui/material'
import { FlexRow } from '@xylabs/react-flexbox'

import { useEmbedPluginState, useResolvePayload } from '../../../contexts'
import { EmbedMenu } from '../menu'

export const EmbedCardHeader: React.FC<CardHeaderProps> = () => {
  const { payload, refreshHuri, huri } = useResolvePayload()
  const { activePlugin, timestampLabel, hideElementsConfig } = useEmbedPluginState()
  const { hideAvatar, hideTitle, hideRefreshButton, hideTimestamp, hideCardActions } = hideElementsConfig ?? {}
  return (
    <CardHeader
      sx={{ flexWrap: 'wrap', rowGap: 1 }}
      avatar={
        hideAvatar ? (
          <></>
        ) : (
          <Avatar sx={{ bgcolor: (theme: Theme) => theme.palette.primary.main }} aria-label={activePlugin?.name}>
            {activePlugin?.name?.charAt(0)}
          </Avatar>
        )
      }
      action={
        <FlexRow flexWrap="wrap" columnGap={0.5}>
          {payload?.timestamp ? (
            hideTimestamp && hideRefreshButton ? (
              ''
            ) : (
              <Chip
                avatar={hideRefreshButton ? <></> : <RefreshIcon />}
                clickable={hideRefreshButton ? false : true}
                onClick={refreshHuri}
                label={hideTimestamp ? '' : `${timestampLabel} ${new Date(payload.timestamp).toLocaleString()}`}
              />
            )
          ) : null}
          {/* Huri case is valid as long as the only menu item is JSON */}
          {hideCardActions || huri === undefined ? null : <EmbedMenu />}
        </FlexRow>
      }
      title={hideTitle ? '' : activePlugin?.name}
    />
  )
}
