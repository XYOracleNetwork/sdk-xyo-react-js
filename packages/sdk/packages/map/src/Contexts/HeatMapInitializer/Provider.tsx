import { forget } from '@xylabs/sdk-js'
import type { AnimatedHeatMapColorProps, HeatMapColorProps } from '@xyo-network/react-map-model'
import type { Feature, Polygon } from 'geojson'
import type { PropsWithChildren } from 'react'
import React, { useEffect, useMemo } from 'react'

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

export const HeatMapInitializerProvider: React.FC<PropsWithChildren<MapInitializerProviderProps>> = ({
  children,
  featureSets,
  featureSetsLayers,
  features,
  fitToPadding,
  heatMapColorProps,
  layers,
  zoom,
}) => {
  const { options } = useDynamicPositioning()
  const { mapSettings } = useMapSettings()
  const { map, mapInitialized } = useMapBoxInstance()

  const mapHeat = useMemo(() => {
    return (map && features?.length)
      ? new MapHeat({
          features, map, zoom,
        })
      : undefined
  }, [map, features, zoom])

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
            {
              padding: {
                bottom: fitToPadding, left: fitToPadding, right: fitToPadding, top: fitToPadding,
              },
            },
            map,
            features,
          )
        } else if (options?.zoom && options.center) {
          map.setZoom(options.zoom)
          map.setCenter(options.center)
        }
      }
    }
  }, [mapHeat, map, mapSettings, fitToPadding, options, mapInitialized, features])

  return <HeatMapInitializerContext value={value}>{children}</HeatMapInitializerContext>
}
