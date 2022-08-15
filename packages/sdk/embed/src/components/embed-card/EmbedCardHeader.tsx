import RefreshIcon from '@mui/icons-material/Refresh'
import { Avatar, CardHeader, CardHeaderProps, Chip, Theme } from '@mui/material'
import { FlexRow } from '@xylabs/react-flexbox'

import { useXyoEmbedPluginState } from '../../contexts'
import { EmbedPluginVisibilityConfig } from '../XyoEmbedPluginProps'
import { EmbedMenu } from './menu'

interface EmbedCardHeaderProps extends CardHeaderProps {
  hideElementsConfig?: EmbedPluginVisibilityConfig
}

export const EmbedCardHeader: React.FC<EmbedCardHeaderProps> = ({ hideElementsConfig }) => {
  const { activePlugin, payload, timestampLabel, refreshHuri } = useXyoEmbedPluginState()
  const { hideCardHeader, hideAvatar, hideTitle, hideRefreshButton, hideTimestamp, hideCardActions } = hideElementsConfig ?? {}
  return (
    <>
      {hideCardHeader ? null : (
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
            <FlexRow>
              {payload?.timestamp ? (
                hideTimestamp && hideRefreshButton ? (
                  ''
                ) : (
                  <Chip
                    avatar={hideRefreshButton ? <></> : <RefreshIcon />}
                    clickable
                    onClick={refreshHuri}
                    label={hideTimestamp ? '' : `${timestampLabel} ${new Date(payload.timestamp).toLocaleString()}`}
                  />
                )
              ) : null}
              {hideCardActions ? null : <EmbedMenu />}
            </FlexRow>
          }
          title={hideTitle ? '' : activePlugin?.name}
        />
      )}
    </>
  )
}
