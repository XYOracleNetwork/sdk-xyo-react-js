import { forget } from '@xylabs/forget'
import { WithChildren } from '@xylabs/react-shared'
import { Feature, Polygon } from 'geojson'
import { useEffect, useState } from 'react'

import { XyoAnimatedHeatMapColorProps, XyoHeatMapColorProps } from '../../Colors'
import { useDynamicPositioning } from '../../hooks'
import { XyoMapLayer } from '../../Layers'
import { XyoMapHeat } from '../../MapBoxClasses'
import { useMapBoxInstance } from '../MapBoxInstance'
import { useMapSettings } from '../MapSettings'
import { HeatMapInitializerContext } from './Context'
import { HeatMapInitializerState } from './State'

export interface MapInitializerProviderProps {
  featureSets?: Feature<Polygon>[][]
  featureSetsLayers?: XyoMapLayer[]
  features?: Feature<Polygon>[]
  fitToPadding?: number
  heatMapColorProps: XyoHeatMapColorProps | XyoAnimatedHeatMapColorProps
  layers?: XyoMapLayer[]
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
  const [MapHeat, setMapHeat] = useState<XyoMapHeat>()
  const { options } = useDynamicPositioning()
  const { mapSettings } = useMapSettings()
  const { map, mapInitialized } = useMapBoxInstance()

  const value: HeatMapInitializerState = {
    MapHeat,
    heatMapColorProps,
  }

  useEffect(() => {
    if (mapInitialized && featureSets?.length && featureSets[0].length && map && featureSetsLayers?.length) {
      const { lowUsageColor, highUsageColor } = heatMapColorProps as XyoAnimatedHeatMapColorProps
      forget(XyoMapHeat.initializeAnimatedHeatMapSource(featureSetsLayers, featureSets, map, lowUsageColor, highUsageColor))
    }

    return () => {
      XyoMapHeat.animationStarted = false
    }
  }, [featureSets, featureSetsLayers, mapInitialized, map, heatMapColorProps])

  useEffect(() => {
    if (MapHeat && mapInitialized && features?.length && layers?.length) {
      MapHeat.initializeHeatMapSource(layers)
    }
  }, [MapHeat, features?.length, layers, mapInitialized])

  useEffect(() => {
    if (mapInitialized) {
      const { fitToPoints } = mapSettings || {}

      if (map) {
        if (fitToPoints?.value === true) {
          XyoMapHeat.initialMapPositioning({ padding: fitToPadding }, map, features)
        } else if (options.zoom && options.center) {
          map.setZoom(options.zoom)
          map.setCenter(options.center)
        }
      }
    }
  }, [MapHeat, map, mapSettings, fitToPadding, options, mapInitialized, features])

  useEffect(() => {
    if (map && features?.length) {
      // Every time we get a new map or features, we make a new class
      setMapHeat(new XyoMapHeat({ features, map, zoom }))
    }
  }, [map, features, zoom])

  return <HeatMapInitializerContext.Provider value={value}>{children}</HeatMapInitializerContext.Provider>
}
