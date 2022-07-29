import { Dispatch } from 'react'

import { MapSetting } from '../../Settings'

export interface MapSettingsState {
  setMapSettings?: Dispatch<React.SetStateAction<MapSetting>>
  mapSettings?: MapSetting
}
