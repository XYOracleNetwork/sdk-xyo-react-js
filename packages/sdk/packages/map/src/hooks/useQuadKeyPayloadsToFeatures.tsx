import { GeoJson } from '@xyo-network/sdk-geo'
import { Feature, Geometry } from 'geojson'
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

  useEffect(() => {
    // Convert Multiple Payloads from Quadkey to GeoJson
    if (Array.isArray(payloads)) {
      const payloadsArray = payloads as NetworkXyoLocationHeatmapQuadkeyAnswerPayload[]
      const mappedFeatures = payloadsArray?.map((payload) => payload.result.map(quadKeyToFeature))

      setMultipleFeatureSets(mappedFeatures.map((features) => features.map(setDensity)))
    }

    // Convert Single Payload from Quadkey to GeoJson
    if (payloads && (payloads as NetworkXyoLocationHeatmapQuadkeyAnswerPayload).result) {
      const singlePayload = payloads as NetworkXyoLocationHeatmapQuadkeyAnswerPayload
      const mappedFeatures = singlePayload.result.map(quadKeyToFeature)

      setFeatures(mappedFeatures.map(setDensity))
    }
  }, [payloads])

  return { features, multipleFeatureSets }
}

export { useQuadKeyPayloadsToFeatures }
