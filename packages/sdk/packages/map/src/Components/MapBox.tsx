// eslint-disable-next-line import/no-internal-modules
import 'mapbox-gl/dist/mapbox-gl.css'

import { Map, MapboxOptions } from 'mapbox-gl'
import { useEffect, useRef, useState } from 'react'

import { useMapBoxInstance, useMapSettings } from '../Contexts'
import { useDynamicMapResize } from '../hooks'
import { XyoMapStyle } from '../lib'

export interface MapBoxProps {
  accessToken: string
  darkMode?: boolean
  options?: Partial<MapboxOptions>
  zoom?: number
}

export const MapBox: React.FC<MapBoxProps> = ({ accessToken, darkMode = false, options, zoom = 2, ...props }) => {
  const [map, setMap] = useState<Map>()
  const mapContainerRef = useRef<HTMLDivElement | null>(null)
  const mapCanvasRef = useRef<HTMLCanvasElement | null>(null)
  const { setMapBoxInstance, map: mapInstance } = useMapBoxInstance()
  const { mapSettings } = useMapSettings()

  const activeResize = mapSettings?.dynamicMapResize.value
  useDynamicMapResize(mapContainerRef, mapCanvasRef, mapInstance, activeResize)

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

    // save the map canvas ref to help with resizing
    mapCanvasRef.current = document.querySelector('.mapboxgl-canvas')

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
