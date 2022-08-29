import { Paper, Stack } from '@mui/material'
import { FlexBoxProps, FlexGrowRow, FlexRow } from '@xylabs/react-flexbox'
import { useAppSettings } from '@xyo-network/react-app-settings'

import { useMapSettings } from '../../Contexts'
import { MapSettingSwitch } from './Setting'

export const MapSettings: React.FC<FlexBoxProps> = (props) => {
  const { mapSettings } = useMapSettings()
  const { developerMode } = useAppSettings()

  return mapSettings && developerMode ? (
    <FlexGrowRow bottom={36} left={10} position="absolute" {...props}>
      <FlexRow paddingX={2}>
        <Paper>
          <Stack direction="row" spacing={1} marginX={1}>
            {Object.keys(mapSettings).map((key, index) => {
              return <MapSettingSwitch key={index} field={mapSettings[key].field} />
            })}
          </Stack>
        </Paper>
      </FlexRow>
    </FlexGrowRow>
  ) : null
}
