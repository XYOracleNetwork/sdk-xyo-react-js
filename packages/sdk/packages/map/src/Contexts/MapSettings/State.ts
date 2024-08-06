import { Dispatch } from 'react'

import { MapSetting } from '../../Settings/index.ts'

export interface MapSettingsState {
  mapSettings?: MapSetting
  setMapSettings?: Dispatch<React.SetStateAction<MapSetting>>
}
