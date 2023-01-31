import { Dispatch } from 'react'

import { MapSetting } from '../../Settings'

export interface MapSettingsState {
  mapSettings?: MapSetting
  setMapSettings?: Dispatch<React.SetStateAction<MapSetting>>
}
