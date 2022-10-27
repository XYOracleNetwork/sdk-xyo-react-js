import { Alert, AlertTitle } from '@mui/material'
import { FlexBoxProps, FlexCol } from '@xylabs/react-flexbox'
import { useArchivistGet } from '@xyo-network/react-archivist'
import { Feature, Polygon } from 'geojson'

import { AnimatedHeatMapSettings } from '../AnimatedHeatMapSettings'
import { useFindHashes, useHeatMapColors, useQuadKeyPayloadsToFeatures } from '../hooks'
import { NetworkXyoLocationHeatmapQuadkeyAnswerPayload } from '../types'
import { AnimatedHeatMap } from './AnimatedHeatMap'
import { AnimatedHeatMapLegend } from './Legend'

export interface AnimatedHeatMapLoadedProps extends FlexBoxProps {
  accessToken: string
}

export const AnimatedHeatMapLoaded: React.FC<AnimatedHeatMapLoadedProps> = ({ accessToken, ...props }) => {
  const hashes = useFindHashes()
  const [payloads, xyoError] = useArchivistGet<NetworkXyoLocationHeatmapQuadkeyAnswerPayload>(hashes)
  const { multipleFeatureSets } = useQuadKeyPayloadsToFeatures(payloads)
  const { heatMapColorProps, legendProps } = useHeatMapColors()

  const MapBoxHeatProps = {
    flexGrow: 1,
    legend: legendProps ? <AnimatedHeatMapLegend {...legendProps} /> : null,
  }

  return (
    <FlexCol alignItems="stretch" {...props}>
      {xyoError ? (
        <Alert sx={{ mt: 2 }}>
          <AlertTitle>Error Loading Map</AlertTitle>
          {xyoError.message ? `Error: ${xyoError.message}` : null}
          You might try authenticating again.
        </Alert>
      ) : null}
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
