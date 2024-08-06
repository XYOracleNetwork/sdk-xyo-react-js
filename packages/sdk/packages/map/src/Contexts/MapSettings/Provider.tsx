import { WithChildren } from '@xylabs/react-shared'
import React, { useEffect, useMemo, useState } from 'react'

import { MapSettings } from '../../MapBoxClasses/index.js'
import { MapSetting } from '../../Settings/index.js'
import { useMapBoxInstance } from '../MapBoxInstance/index.js'
import { MapSettingsContext } from './Context.js'
import { MapSettingsState } from './State.js'

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

  const value: MapSettingsState = useMemo(() => ({
    mapSettings,
    setMapSettings,
  }), [mapSettings, setMapSettings])

  useEffect(() => {
    if (mapSettings && map && mapInitialized) {
      MapSettings.updateSettings({ debugLayerName, map, requestLocation, settings: mapSettings, zoom })
    }
  }, [debugLayerName, map, mapInitialized, mapSettings, requestLocation, zoom])

  return <MapSettingsContext.Provider value={value}>{children}</MapSettingsContext.Provider>
}
