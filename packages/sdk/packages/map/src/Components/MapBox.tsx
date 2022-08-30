// eslint-disable-next-line import/no-internal-modules
import 'mapbox-gl/dist/mapbox-gl.css'

import { Map, MapboxOptions } from 'mapbox-gl'
import { useEffect, useRef, useState } from 'react'

import { useMapBoxInstance, useMapSettings } from '../Contexts'
import { XyoMapStyle } from '../lib'

export interface MapBoxProps {
  options?: Partial<MapboxOptions>
  zoom?: number
  darkMode?: boolean
  accessToken: string
}

export const MapBox: React.FC<MapBoxProps> = ({ accessToken, darkMode = false, zoom = 2, options, ...props }) => {
  const [map, setMap] = useState<Map>()
  const mapContainerRef = useRef<HTMLDivElement | null>(null)
  const { setMapBoxInstance } = useMapBoxInstance()
  const { mapSettings } = useMapSettings()

  useEffect(() => {
    if (mapSettings?.preferDark?.value === true) {
      map?.setStyle(`mapbox://styles/${XyoMapStyle.Dark}`)
    } else {
      map?.setStyle(`mapbox://styles/${darkMode ? XyoMapStyle.Dark : XyoMapStyle.Light}`)
    }
  }, [map, darkMode, mapSettings])

  useEffect(() => {
    const map = new Map({
      accessToken,
      center: [0, 0],
      container: mapContainerRef.current ?? '',
      style: `mapbox://styles/${XyoMapStyle.Light}`,
      zoom,
      ...options,
    })

    // Allow external components to control the map
    setMapBoxInstance?.(map)
    setMap(map)

    console.log('Created Map')

    return () => {
      console.log('Removing Map')
      map.remove()
    }
  }, [mapContainerRef, setMap, options, zoom, setMapBoxInstance, accessToken])

  return (
    <div
      ref={(el) => (mapContainerRef.current = el)}
      style={{
        bottom: 0,
        left: 0,
        position: 'absolute',
        right: 0,
        top: 0,
        ...props,
      }}
    />
  )
}
