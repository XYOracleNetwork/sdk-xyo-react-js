import type { WithChildren } from '@xylabs/react-shared'
import type { Map } from 'mapbox-gl'
import React, { useEffect, useMemo, useState } from 'react'

import { MapBoxInstanceContext } from './Context.ts'

export const MapBoxInstanceProvider: React.FC<WithChildren> = ({ children }) => {
  const [map, setMapBoxInstance] = useState<Map>()
  const [mapInitialized, setMapInitialized] = useState(false)

  const value = useMemo(() => ({ map, mapInitialized, setMapBoxInstance }), [map, mapInitialized, setMapBoxInstance])

  useEffect(() => {
    if (!mapInitialized && map) {
      map?.on('load', () => {
        setMapInitialized(true)
      })
    }
  }, [map, mapInitialized, setMapInitialized])

  return <MapBoxInstanceContext.Provider value={value}>{children}</MapBoxInstanceContext.Provider>
}
