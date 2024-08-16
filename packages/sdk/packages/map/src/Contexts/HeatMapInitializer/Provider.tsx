import { forget } from '@xylabs/forget'
import type { WithChildren } from '@xylabs/react-shared'
import type { Feature, Polygon } from 'geojson'
import React, { useEffect, useMemo, useState } from 'react'

import type { AnimatedHeatMapColorProps, HeatMapColorProps } from '../../Colors/index.ts'
import { useDynamicPositioning } from '../../hooks/index.ts'
import type { MapLayer } from '../../Layers/index.ts'
import { MapHeat } from '../../MapBoxClasses/index.ts'
import { useMapBoxInstance } from '../MapBoxInstance/index.ts'
import { useMapSettings } from '../MapSettings/index.ts'
import { HeatMapInitializerContext } from './Context.ts'
import type { HeatMapInitializerState } from './State.ts'

export interface MapInitializerProviderProps {
  featureSets?: Feature<Polygon>[][]
  featureSetsLayers?: MapLayer[]
  features?: Feature<Polygon>[]
  fitToPadding?: number
  heatMapColorProps: HeatMapColorProps | AnimatedHeatMapColorProps
  layers?: MapLayer[]
  zoom?: number
}

export const HeatMapInitializerProvider: React.FC<WithChildren<MapInitializerProviderProps>> = ({
  children,
  featureSets,
  featureSetsLayers,
  features,
  fitToPadding,
  heatMapColorProps,
  layers,
  zoom,
}) => {
  const [mapHeat, setMapHeat] = useState<MapHeat>()
  const { options } = useDynamicPositioning()
  const { mapSettings } = useMapSettings()
  const { map, mapInitialized } = useMapBoxInstance()

  const value: HeatMapInitializerState = useMemo(() => ({
    MapHeat: mapHeat,
    heatMapColorProps,
  }), [mapHeat, heatMapColorProps])

  useEffect(() => {
    if (mapInitialized && featureSets?.length && featureSets[0].length > 0 && map && featureSetsLayers?.length) {
      const { lowUsageColor, highUsageColor } = heatMapColorProps as AnimatedHeatMapColorProps
      forget(MapHeat.initializeAnimatedHeatMapSource(featureSetsLayers, featureSets, map, lowUsageColor, highUsageColor))
    }

    return () => {
      MapHeat.animationStarted = false
    }
  }, [featureSets, featureSetsLayers, mapInitialized, map, heatMapColorProps])

  useEffect(() => {
    if (mapHeat && mapInitialized && features?.length && layers?.length) {
      mapHeat.initializeHeatMapSource(layers)
    }
  }, [mapHeat, features?.length, layers, mapInitialized])

  useEffect(() => {
    if (mapInitialized) {
      const { fitToPoints } = mapSettings || {}

      if (map) {
        if (fitToPoints?.value === true) {
          MapHeat.initialMapPositioning(
            { padding: { bottom: fitToPadding, left: fitToPadding, right: fitToPadding, top: fitToPadding } },
            map,
            features,
          )
        } else if (options.zoom && options.center) {
          map.setZoom(options.zoom)
          map.setCenter(options.center)
        }
      }
    }
  }, [mapHeat, map, mapSettings, fitToPadding, options, mapInitialized, features])

  useEffect(() => {
    if (map && features?.length) {
      // Every time we get a new map or features, we make a new class
      setMapHeat(new MapHeat({ features, map, zoom }))
    }
  }, [map, features, zoom])

  return <HeatMapInitializerContext.Provider value={value}>{children}</HeatMapInitializerContext.Provider>
}
