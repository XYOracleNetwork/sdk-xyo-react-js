import { GeoJson } from '@xyo-network/sdk-geo'
import { Feature, Geometry } from 'geojson'
import compact from 'lodash/compact'
import { useEffect, useState } from 'react'

import { NetworkXyoLocationHeatmapQuadkeyAnswerPayload } from '../types'

const quadKeyToFeature = ({ density, quadkey }: { density: number; quadkey: string }) => {
  const polygonFeature = new GeoJson(quadkey).polygonFeature()
  polygonFeature.properties = {
    count: density,
    density,
  }
  return polygonFeature
}

const setDensity = (feature: Feature) => {
  if (feature.properties) {
    feature.properties.value = feature.properties.density / 5
  }
  return feature
}

const useQuadKeyPayloadsToFeatures = (payloads?: NetworkXyoLocationHeatmapQuadkeyAnswerPayload[] | NetworkXyoLocationHeatmapQuadkeyAnswerPayload) => {
  const [multipleFeatureSets, setMultipleFeatureSets] = useState<Feature<Geometry>[][]>([[]])
  const [features, setFeatures] = useState<Feature<Geometry>[]>([])
  const [error, setError] = useState<Error>()

  useEffect(() => {
    // Convert Multiple Payloads from Quadkey to GeoJson
    if (Array.isArray(payloads)) {
      if (compact(payloads).length !== 0) {
        const payloadsArray = payloads as (NetworkXyoLocationHeatmapQuadkeyAnswerPayload | null)[]
        const mappedFeatures = payloadsArray?.map((payload) => payload?.result.map(quadKeyToFeature))

        setMultipleFeatureSets(mappedFeatures.map((features) => features?.map(setDensity) ?? []))
      } else {
        setError(new Error('Cannot find payloads for provided hashes'))
      }
    }

    // Convert Single Payload from Quadkey to GeoJson
    if (payloads && (payloads as NetworkXyoLocationHeatmapQuadkeyAnswerPayload).result) {
      const singlePayload = payloads as NetworkXyoLocationHeatmapQuadkeyAnswerPayload
      const mappedFeatures = singlePayload.result.map(quadKeyToFeature)

      setFeatures(mappedFeatures.map(setDensity))
    }
  }, [payloads])

  return { error, features, multipleFeatureSets }
}

export { useQuadKeyPayloadsToFeatures }
