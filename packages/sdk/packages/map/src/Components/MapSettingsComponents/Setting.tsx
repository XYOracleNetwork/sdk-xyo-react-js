import { FormControlLabel, Switch, SwitchProps } from '@mui/material'

import { useMapSettings } from '../../Contexts'

export interface MapSettingSwitchProps extends SwitchProps {
  field: string
  developerMode?: boolean
}

export const MapSettingSwitch: React.FC<MapSettingSwitchProps> = ({ field, developerMode, ...props }) => {
  const { mapSettings, setMapSettings } = useMapSettings()
  const setting = mapSettings?.[field]

  const onLocalChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (setting) {
      setMapSettings?.((previous) => {
        previous[setting.field].value = event.target.checked
        return { ...previous }
      })
    }
  }

  if (setting?.devMode && developerMode === false) {
    return null
  }

  return setting?.hidden ? null : (
    <FormControlLabel label={setting?.label} control={<Switch checked={setting?.value} onChange={onLocalChange} {...props} />} />
  )
}
