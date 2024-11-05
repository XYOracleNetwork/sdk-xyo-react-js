import type { MapSetting } from '@xyo-network/react-map-model'
import type { Dispatch } from 'react'

export interface MapSettingsState {
  mapSettings?: MapSetting
  setMapSettings?: Dispatch<React.SetStateAction<MapSetting>>
}
