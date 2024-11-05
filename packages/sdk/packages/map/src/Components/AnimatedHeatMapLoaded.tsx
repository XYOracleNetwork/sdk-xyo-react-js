import { Alert, AlertTitle } from '@mui/material'
import type { FlexBoxProps } from '@xylabs/react-flexbox'
import { FlexCol } from '@xylabs/react-flexbox'
import { useWeakArchivistFromNode, useWeakArchivistGet } from '@xyo-network/react-archivist'
import type { NetworkLocationHeatmapQuadkeyAnswerPayload } from '@xyo-network/react-map-model'
import {
  AnimatedHeatMapSettings,
  useFindHashes, useHeatMapColors, useQuadKeyPayloadsToFeatures,
} from '@xyo-network/react-map-model'
import type { Feature, Polygon } from 'geojson'
import React from 'react'

import { AnimatedHeatMap } from './AnimatedHeatMap.tsx'
import { AnimatedHeatMapLegend } from './Legend.tsx'

export interface AnimatedHeatMapLoadedProps extends FlexBoxProps {
  accessToken: string
  archivistNameOrAddress: string
}

export const AnimatedHeatMapLoaded: React.FC<AnimatedHeatMapLoadedProps> = ({
  accessToken, archivistNameOrAddress, ...props
}) => {
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
      {xyoError
        ? (
            <Alert sx={{ mt: 2 }}>
              <AlertTitle>Error Loading Map</AlertTitle>
              {xyoError.message ? `Error: ${xyoError.message}` : null}
              You might try authenticating again.
            </Alert>
          )
        : null}
      {hashes === undefined
        ? <Alert>Missing answer hash for heat map query</Alert>
        : (
            <AnimatedHeatMap
              accessToken={accessToken}
              defaultMapSettings={AnimatedHeatMapSettings}
              animatedFeatureSets={multipleFeatureSets.slice(1) as Feature<Polygon>[][]}
              staticFeatureSet={multipleFeatureSets[0] as Feature<Polygon>[]}
              heatMapColorProps={heatMapColorProps}
              {...MapBoxHeatProps}
            />
          )}
    </FlexCol>
  )
}
