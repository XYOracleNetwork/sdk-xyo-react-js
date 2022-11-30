import { useAsyncEffect } from '@xylabs/react-shared'
import { XyoPayload } from '@xyo-network/payload'
import { Feature, Geometry } from 'geojson'
import { useState } from 'react'

import { ElevationPayloadProcessor } from '../classes'
import { useOpenElevationApiClient } from '../contexts'
import { NetworkElevationQuadkeyAnswerPayload } from '../types'

export const useElevationProcessor = (payloads?: XyoPayload) => {
  const [features, setFeatures] = useState<Feature<Geometry>[]>()
  const { lookupLocations } = useOpenElevationApiClient()

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async (mounted) => {
      // Convert Single Payload from Quadkeys to GeoJson with Elevations
      if (payloads && (payloads as NetworkElevationQuadkeyAnswerPayload).result && lookupLocations && features === undefined) {
        const singlePayload = payloads as NetworkElevationQuadkeyAnswerPayload
        const elevationProcessor = new ElevationPayloadProcessor({ lookupLocations, payload: singlePayload })
        elevationProcessor.buildFeatures()

        const featuresWithElevations = await elevationProcessor.buildElevations()
        if (featuresWithElevations && mounted()) {
          setFeatures(featuresWithElevations)
        }
      }
    },
    [features, lookupLocations, payloads],
  )

  return { features }
}
