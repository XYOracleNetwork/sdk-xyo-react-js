import { useAsyncEffect } from '@xylabs/react-async-effect'
import { Payload } from '@xyo-network/payload-model'
import { Feature, Geometry } from 'geojson'
import { useState } from 'react'

import { ElevationPayloadProcessor } from '../classes/index.ts'
import { useOpenElevationApiClient } from '../contexts/index.ts'
import { NetworkElevationQuadkeyAnswerPayload } from '../types.ts'

export const useElevationProcessor = (payload?: Payload) => {
  const [features, setFeatures] = useState<Feature<Geometry>[]>()
  const { lookupLocations } = useOpenElevationApiClient()

  useAsyncEffect(

    async (mounted) => {
      // Convert Single Payload from Quadkeys to GeoJson with Elevations
      if (payload && (payload as NetworkElevationQuadkeyAnswerPayload).result && lookupLocations && features === undefined) {
        const singlePayload = payload as NetworkElevationQuadkeyAnswerPayload
        const elevationProcessor = new ElevationPayloadProcessor({ lookupLocations, payload: singlePayload })
        elevationProcessor.buildFeatures()

        const featuresWithElevations = await elevationProcessor.buildElevations()
        if (featuresWithElevations && mounted()) {
          setFeatures(featuresWithElevations)
        }
      }
    },
    [features, lookupLocations, payload],
  )

  return { features }
}
