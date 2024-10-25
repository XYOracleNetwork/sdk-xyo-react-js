import { darken, useTheme } from '@mui/material'
import { FlexCol } from '@xylabs/react-flexbox'
import type { Feature, Polygon } from 'geojson'
import type { PropsWithChildren } from 'react'
import React, { useState } from 'react'

import type { AnimatedHeatMapColorProps } from '../Colors/index.ts'
import {
  HeatMapInitializerProvider, MapBoxInstanceProvider, MapSettingsProvider,
} from '../Contexts/index.ts'
import type { MapLayer } from '../Layers/index.ts'
import { LocationHeatMapLayerBuilderAnimated, MapHeatConstants } from '../Layers/index.ts'
import type { MapSetting } from '../Settings/index.ts'
import { MapboxHeatFlexBox } from './MapBoxHeat.tsx'

export interface AnimatedHeatMapProps {
  accessToken: string
  animatedFeatureSets: Feature<Polygon>[][]
  defaultMapSettings?: MapSetting
  heatMapColorProps: AnimatedHeatMapColorProps
  staticFeatureSet: Feature<Polygon>[]
}

export const AnimatedHeatMap: React.FC<PropsWithChildren<AnimatedHeatMapProps>> = ({
  accessToken,
  animatedFeatureSets,
  defaultMapSettings,
  heatMapColorProps,
  staticFeatureSet,
  ...props
}) => {
  const theme = useTheme()
  const {
    staticMapColor, lowUsageColor, highUsageColor,
  } = heatMapColorProps || {}
  const localStaticMapColor = staticMapColor ?? theme.palette.primary.light

  const [layers] = useState<MapLayer[]>(() => [
    LocationHeatMapLayerBuilderAnimated(localStaticMapColor, 0, 'static'),
    LocationHeatMapLayerBuilderAnimated(lowUsageColor || localStaticMapColor, 0, 'animated'),
    LocationHeatMapLayerBuilderAnimated(highUsageColor || darken(localStaticMapColor, 0.9), 1, 'animated'),
  ])

  return animatedFeatureSets?.length
    ? (
        <MapBoxInstanceProvider>
          <MapSettingsProvider defaultMapSettings={defaultMapSettings} debugLayerName={MapHeatConstants.LocationDebugLayerId}>
            <HeatMapInitializerProvider
              features={staticFeatureSet}
              layers={[layers[0]]}
              featureSets={animatedFeatureSets}
              featureSetsLayers={layers.slice(1, 3)}
              heatMapColorProps={heatMapColorProps}
            >
              <MapboxHeatFlexBox accessToken={accessToken} {...props}></MapboxHeatFlexBox>
            </HeatMapInitializerProvider>
          </MapSettingsProvider>
        </MapBoxInstanceProvider>
      )
    : <FlexCol minHeight={160} minWidth={160} busy />
}
