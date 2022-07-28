import { darken, useTheme } from '@mui/material'
import { FlexCol } from '@xylabs/react-flexbox'
import { WithChildren } from '@xylabs/react-shared'
import { Feature, Polygon } from 'geojson'
import { useState } from 'react'

import { XyoAnimatedHeatMapColorProps } from '../Colors'
import { HeatMapInitializerProvider, MapBoxInstanceProvider, MapSettingsProvider } from '../Contexts'
import { LocationHeatMapLayerBuilderAnimated, MapHeatConstants, XyoMapLayer } from '../Layers'
import { MapSetting } from '../Settings'
import { MapBoxHeat } from './MapBoxHeat'

interface AnimatedHeatMapProps {
  animatedFeatureSets: Feature<Polygon>[][]
  staticFeatureSet: Feature<Polygon>[]
  defaultMapSettings?: MapSetting
  heatMapColorProps: XyoAnimatedHeatMapColorProps
}

export const AnimatedHeatMap: React.FC<WithChildren<AnimatedHeatMapProps>> = ({ animatedFeatureSets, defaultMapSettings, staticFeatureSet, heatMapColorProps, ...props }) => {
  const theme = useTheme()
  const { staticMapColor, lowUsageColor, highUsageColor } = heatMapColorProps || {}
  const localStaticMapColor = staticMapColor ?? theme.palette.primary.light

  const [layers] = useState<XyoMapLayer[]>([
    LocationHeatMapLayerBuilderAnimated(localStaticMapColor, 0, 'static'),
    LocationHeatMapLayerBuilderAnimated(lowUsageColor || localStaticMapColor, 0, 'animated'),
    LocationHeatMapLayerBuilderAnimated(highUsageColor || darken(localStaticMapColor, 0.9), 1, 'animated'),
  ])

  return animatedFeatureSets?.length ? (
    <MapBoxInstanceProvider>
      <MapSettingsProvider defaultMapSettings={defaultMapSettings} debugLayerName={MapHeatConstants.LocationDebugLayerId}>
        <HeatMapInitializerProvider
          features={staticFeatureSet}
          layers={[layers[0]]}
          featureSets={animatedFeatureSets}
          featureSetsLayers={layers.slice(1, 3)}
          heatMapColorProps={heatMapColorProps}
        >
          <MapBoxHeat {...props}></MapBoxHeat>
        </HeatMapInitializerProvider>
      </MapSettingsProvider>
    </MapBoxInstanceProvider>
  ) : (
    <FlexCol flexGrow={1} busy />
  )
}
