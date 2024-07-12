import { WithChildren } from '@xylabs/react-shared'
import { Map } from 'mapbox-gl'
import { useEffect, useState } from 'react'

import { MapBoxInstanceContext } from './Context.js'
import { MapBoxInstanceState } from './State.js'

export const MapBoxInstanceProvider: React.FC<WithChildren> = ({ children }) => {
  const [map, setMapBoxInstance] = useState<Map>()
  const [mapInitialized, setMapInitialized] = useState(false)

  const value: MapBoxInstanceState = { map, mapInitialized, setMapBoxInstance }

  useEffect(() => {
    if (!mapInitialized && map) {
      map?.on('load', () => {
        setMapInitialized(true)
      })
    }
  }, [map, mapInitialized, setMapInitialized])

  return <MapBoxInstanceContext.Provider value={value}>{children}</MapBoxInstanceContext.Provider>
}
