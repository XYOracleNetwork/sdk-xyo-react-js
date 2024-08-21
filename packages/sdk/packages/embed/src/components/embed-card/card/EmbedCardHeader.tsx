import { Refresh as RefreshIcon } from '@mui/icons-material'
import type { CardHeaderProps, Theme } from '@mui/material'
import {
  Avatar, CardHeader, Chip,
} from '@mui/material'
import { FlexRow } from '@xylabs/react-flexbox'
import React from 'react'

import { useEmbedPluginState, useResolvePayload } from '../../../contexts/index.ts'
import { EmbedMenu } from '../menu/index.ts'

export const EmbedCardHeader: React.FC<CardHeaderProps> = () => {
  const {
    refreshHuri, huri,
  } = useResolvePayload()
  const {
    activePlugin, timestampLabel, hideElementsConfig,
  } = useEmbedPluginState()
  const {
    hideAvatar, hideTitle, hideRefreshButton, hideTimestamp, hideCardActions,
  } = hideElementsConfig ?? {}
  // this is temporary so that we can add the ability to get a timestamp via diviner later
  const timestamp = Date.now()
  return (
    <CardHeader
      sx={{
        flexWrap: 'wrap', rowGap: 1,
      }}
      avatar={
        hideAvatar
          ? <></>
          : (
              <Avatar sx={{ bgcolor: (theme: Theme) => theme.palette.primary.main }} aria-label={activePlugin?.name}>
                {activePlugin?.name?.charAt(0)}
              </Avatar>
            )
      }
      action={(
        <FlexRow flexWrap="wrap" columnGap={0.5}>
          {timestamp
            ? hideTimestamp && hideRefreshButton
              ? ''
              : (
                  <Chip
                    avatar={hideRefreshButton ? <></> : <RefreshIcon />}
                    clickable={hideRefreshButton ? false : true}
                    onClick={refreshHuri}
                    label={hideTimestamp ? '' : `${timestampLabel} ${new Date(timestamp).toLocaleString()}`}
                  />
                )

            : null}
          {/* Huri case is valid as long as the only menu item is JSON */}
          {hideCardActions || huri === undefined ? null : <EmbedMenu />}
        </FlexRow>
      )}
      title={hideTitle ? '' : activePlugin?.name}
    />
  )
}
