import { Paper, Stack } from '@mui/material'
import type { FlexBoxProps } from '@xylabs/react-flexbox'
import { FlexGrowRow, FlexRow } from '@xylabs/react-flexbox'
import { useAppSettings } from '@xyo-network/react-app-settings'
import React from 'react'

import { useMapSettings } from '../../Contexts/index.ts'
import { MapSettingSwitch } from './Setting.tsx'

export interface MapSettingsBoxProps extends FlexBoxProps {
  developerMode?: boolean
}

export const MapSettingsBox: React.FC<MapSettingsBoxProps> = ({
  developerMode, ...props
}) => {
  const { mapSettings } = useMapSettings()
  const { developerMode: devModeFromContext } = useAppSettings()
  const resolveDeveloperMode = developerMode ?? devModeFromContext

  return mapSettings && resolveDeveloperMode
    ? (
        <FlexGrowRow bottom={36} left={10} position="absolute" {...props}>
          <FlexRow paddingX={2}>
            <Paper>
              <Stack direction="row" spacing={1} marginX={1}>
                {Object.keys(mapSettings).map((key, index) => {
                  return <MapSettingSwitch key={index} field={mapSettings[key].field} developerMode={developerMode} />
                })}
              </Stack>
            </Paper>
          </FlexRow>
        </FlexGrowRow>
      )
    : null
}
