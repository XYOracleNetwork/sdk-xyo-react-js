import { Paper, Stack } from '@mui/material'
import { FlexBoxProps, FlexGrowRow, FlexRow } from '@xylabs/react-flexbox'
import { useAppSettings } from '@xyo-network/react-app-settings'

import { useMapSettings } from '../../Contexts'
import { MapSettingSwitch } from './Setting'

interface MapSettingsProps extends FlexBoxProps {
  developerMode?: boolean
}

export const MapSettings: React.FC<MapSettingsProps> = ({ developerMode, ...props }) => {
  const { mapSettings } = useMapSettings()
  const { developerMode: devModeFromContext } = useAppSettings()
  const resolveDeveloperMode = developerMode ?? devModeFromContext

  return mapSettings && resolveDeveloperMode ? (
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
  ) : null
}
