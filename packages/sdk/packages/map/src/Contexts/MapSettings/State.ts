import type { Dispatch } from 'react'

import type { MapSetting } from '../../Settings/index.ts'

export interface MapSettingsState {
  mapSettings?: MapSetting
  setMapSettings?: Dispatch<React.SetStateAction<MapSetting>>
}
