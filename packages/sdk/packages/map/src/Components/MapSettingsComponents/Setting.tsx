import { FormControlLabel, Switch, SwitchProps } from '@mui/material'
import React from 'react'

import { useMapSettings } from '../../Contexts/index.js'

export interface MapSettingSwitchProps extends SwitchProps {
  developerMode?: boolean
  field: string
}

export const MapSettingSwitch: React.FC<MapSettingSwitchProps> = ({ developerMode, field, ...props }) => {
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

  return setting?.hidden
    ? null
    : (
        <FormControlLabel label={setting?.label} control={<Switch checked={setting?.value} onChange={onLocalChange} {...props} />} />
      )
}
