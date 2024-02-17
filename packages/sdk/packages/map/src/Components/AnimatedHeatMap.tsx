import { darken, useTheme } from '@mui/material'
import { FlexCol } from '@xylabs/react-flexbox'
import { WithChildren } from '@xylabs/react-shared'
import { Feature, Polygon } from 'geojson'
import { useState } from 'react'

import { AnimatedHeatMapColorProps } from '../Colors'
import { HeatMapInitializerProvider, MapBoxInstanceProvider, MapSettingsProvider } from '../Contexts'
import { LocationHeatMapLayerBuilderAnimated, MapHeatConstants, MapLayer } from '../Layers'
import { MapSetting } from '../Settings'
import { MapboxHeatFlexBox } from './MapBoxHeat'

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

  const [layers] = useState<MapLayer[]>([
    LocationHeatMapLayerBuilderAnimated(localStaticMapColor, 0, 'static'),
    LocationHeatMapLayerBuilderAnimated(lowUsageColor || localStaticMapColor, 0, 'animated'),
    LocationHeatMapLayerBuilderAnimated(highUsageColor || darken(localStaticMapColor, 0.9), 1, 'animated'),
  ])

  return animatedFeatureSets?.length ?
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
    : <FlexCol minHeight={160} minWidth={160} busy />
}
