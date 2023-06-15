import { WithChildren } from '@xylabs/react-shared'
import { useEffect, useState } from 'react'

import { MapSettings } from '../../MapBoxClasses'
import { MapSetting } from '../../Settings'
import { useMapBoxInstance } from '../MapBoxInstance'
import { MapSettingsContext } from './Context'
import { MapSettingsState } from './State'

export interface MapSettingsProviderProps {
  debugLayerName?: string
  defaultMapSettings?: MapSetting
  requestLocation?: boolean
  zoom?: number
}

export const MapSettingsProvider: React.FC<WithChildren<MapSettingsProviderProps>> = ({
  children,
  debugLayerName,
  defaultMapSettings,
  requestLocation,
  zoom = 1,
}) => {
  const [mapSettings, setMapSettings] = useState<MapSetting>(defaultMapSettings || {})
  const { map, mapInitialized } = useMapBoxInstance()

  const value: MapSettingsState = {
    mapSettings,
    setMapSettings,
  }

  useEffect(() => {
    if (mapSettings && map && mapInitialized) {
      MapSettings.updateSettings({ debugLayerName, map, requestLocation, settings: mapSettings, zoom })
    }
  }, [debugLayerName, map, mapInitialized, mapSettings, requestLocation, zoom])

  return <MapSettingsContext.Provider value={value}>{children}</MapSettingsContext.Provider>
}
