import { Alert, AlertTitle } from '@mui/material'
import { FlexBoxProps, FlexCol } from '@xylabs/react-flexbox'
import { useWeakArchivistFromNode, useWeakArchivistGet } from '@xyo-network/react-archivist'
import { Feature, Polygon } from 'geojson'

import { AnimatedHeatMapSettings } from '../AnimatedHeatMapSettings.js'
import { useFindHashes, useHeatMapColors, useQuadKeyPayloadsToFeatures } from '../hooks/index.js'
import { NetworkLocationHeatmapQuadkeyAnswerPayload } from '../types/index.js'
import { AnimatedHeatMap } from './AnimatedHeatMap.js'
import { AnimatedHeatMapLegend } from './Legend.js'

export interface AnimatedHeatMapLoadedProps extends FlexBoxProps {
  accessToken: string
  archivistNameOrAddress: string
}

export const AnimatedHeatMapLoaded: React.FC<AnimatedHeatMapLoadedProps> = ({ accessToken, archivistNameOrAddress, ...props }) => {
  const hashes = useFindHashes()
  const [archivist] = useWeakArchivistFromNode(archivistNameOrAddress)
  const [payloads, xyoError] = useWeakArchivistGet<NetworkLocationHeatmapQuadkeyAnswerPayload>(archivist, hashes)
  const { multipleFeatureSets } = useQuadKeyPayloadsToFeatures(payloads)
  const { heatMapColorProps, legendProps } = useHeatMapColors()

  const MapBoxHeatProps = {
    flexGrow: 1,
    legend: legendProps ? <AnimatedHeatMapLegend {...legendProps} /> : null,
  }

  return (
    <FlexCol alignItems="stretch" {...props}>
      {xyoError ?
        <Alert sx={{ mt: 2 }}>
          <AlertTitle>Error Loading Map</AlertTitle>
          {xyoError.message ? `Error: ${xyoError.message}` : null}
          You might try authenticating again.
        </Alert>
      : null}
      {hashes === undefined ?
        <Alert>Missing answer hash for heat map query</Alert>
      : <AnimatedHeatMap
          accessToken={accessToken}
          defaultMapSettings={AnimatedHeatMapSettings}
          animatedFeatureSets={multipleFeatureSets.slice(1, multipleFeatureSets.length) as Feature<Polygon>[][]}
          staticFeatureSet={multipleFeatureSets[0] as Feature<Polygon>[]}
          heatMapColorProps={heatMapColorProps}
          {...MapBoxHeatProps}
        />
      }
    </FlexCol>
  )
}
