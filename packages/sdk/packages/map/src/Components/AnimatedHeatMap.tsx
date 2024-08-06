import { darken, useTheme } from '@mui/material'
import { FlexCol } from '@xylabs/react-flexbox'
import { WithChildren } from '@xylabs/react-shared'
import { Feature, Polygon } from 'geojson'
import React, { useState } from 'react'

import { AnimatedHeatMapColorProps } from '../Colors/index.js'
import { HeatMapInitializerProvider, MapBoxInstanceProvider, MapSettingsProvider } from '../Contexts/index.js'
import { LocationHeatMapLayerBuilderAnimated, MapHeatConstants, MapLayer } from '../Layers/index.js'
import { MapSetting } from '../Settings/index.js'
import { MapboxHeatFlexBox } from './MapBoxHeat.js'

export interface AnimatedHeatMapProps {
  accessToken: string
  animatedFeatureSets: Feature<Polygon>[][]
  defaultMapSettings?: MapSetting
  heatMapColorProps: AnimatedHeatMapColorProps
  staticFeatureSet: Feature<Polygon>[]
}

export const AnimatedHeatMap: React.FC<WithChildren<AnimatedHeatMapProps>> = ({
  accessToken,
  animatedFeatureSets,
  defaultMapSettings,
  heatMapColorProps,
  staticFeatureSet,
  ...props
}) => {
  const theme = useTheme()
  const { staticMapColor, lowUsageColor, highUsageColor } = heatMapColorProps || {}
  const localStaticMapColor = staticMapColor ?? theme.palette.primary.light

  // eslint-disable-next-line @eslint-react/hooks-extra/prefer-use-state-lazy-initialization
  const [layers] = useState<MapLayer[]>([
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
