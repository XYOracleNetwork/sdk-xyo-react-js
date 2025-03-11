import type { Map } from 'mapbox-gl'
import type { PropsWithChildren } from 'react'
import React, {
  useEffect, useMemo, useState,
} from 'react'

import { MapBoxInstanceContext } from './Context.ts'

export const MapBoxInstanceProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [map, setMapBoxInstance] = useState<Map>()
  const [mapInitialized, setMapInitialized] = useState(false)

  const value = useMemo(() => ({
    map, mapInitialized, setMapBoxInstance,
  }), [map, mapInitialized, setMapBoxInstance])

  useEffect(() => {
    if (!mapInitialized && map) {
      map?.on('load', () => {
        setMapInitialized(true)
      })
    }
  }, [map, mapInitialized, setMapInitialized])

  return <MapBoxInstanceContext value={value}>{children}</MapBoxInstanceContext>
}
