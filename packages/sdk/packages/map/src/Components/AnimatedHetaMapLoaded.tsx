import { Alert } from '@mui/material'
import { FlexBoxProps, FlexCol } from '@xylabs/react-flexbox'
import { Feature, Polygon } from 'geojson'

import { AnimatedHeatMapSettings } from '../AnimatedHeatMapSettings'
import { useFetchPayloads, useFindHashes, useHeatMapColors } from '../hooks'
import { AnimatedHeatMap } from './AnimatedHeatMap'
import { AnimatedHeatMapLegend } from './Legend'

export interface AnimatedHeatMapLoadedProps extends FlexBoxProps {
  accessToken: string
}

export const AnimatedHeatMapLoaded: React.FC<AnimatedHeatMapLoadedProps> = ({ accessToken, ...props }) => {
  const hashes = useFindHashes()
  const { multipleFeatureSets } = useFetchPayloads(hashes)
  const { heatMapColorProps, legendProps } = useHeatMapColors()

  const MapBoxHeatProps = {
    flexGrow: 1,
    legend: legendProps ? <AnimatedHeatMapLegend {...legendProps} /> : null,
  }

  return (
    <FlexCol alignItems="stretch" {...props}>
      {hashes !== undefined ? (
        <AnimatedHeatMap
          accessToken={accessToken}
          defaultMapSettings={AnimatedHeatMapSettings}
          animatedFeatureSets={multipleFeatureSets.slice(1, multipleFeatureSets.length) as Feature<Polygon>[][]}
          staticFeatureSet={multipleFeatureSets[0] as Feature<Polygon>[]}
          heatMapColorProps={heatMapColorProps}
          {...MapBoxHeatProps}
        />
      ) : (
        <Alert>Missing answer hash for heat map query</Alert>
      )}
    </FlexCol>
  )
}
