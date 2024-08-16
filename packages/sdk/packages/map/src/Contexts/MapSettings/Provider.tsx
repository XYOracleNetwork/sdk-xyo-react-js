import type { WithChildren } from '@xylabs/react-shared'
import React, { useEffect, useMemo, useState } from 'react'

import { MapSettings } from '../../MapBoxClasses/index.ts'
import type { MapSetting } from '../../Settings/index.ts'
import { useMapBoxInstance } from '../MapBoxInstance/index.ts'
import { MapSettingsContext } from './Context.ts'
import type { MapSettingsState } from './State.ts'

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
