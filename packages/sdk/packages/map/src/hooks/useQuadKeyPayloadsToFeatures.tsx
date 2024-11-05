import { exists } from '@xylabs/exists'
import type { NetworkLocationHeatmapQuadkeyAnswerPayload } from '@xyo-network/react-map-model'
import { GeoJson } from '@xyo-network/sdk-geo'
import type { Feature, Geometry } from 'geojson'
import { useMemo, useState } from 'react'

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

const useQuadKeyPayloadsToFeatures = (payloads?: NetworkLocationHeatmapQuadkeyAnswerPayload[] | NetworkLocationHeatmapQuadkeyAnswerPayload) => {
  const [multipleFeatureSets, setMultipleFeatureSets] = useState<Feature<Geometry>[][]>([[]])
  const [features, setFeatures] = useState<Feature<Geometry>[]>([])
  const [error, setError] = useState<Error>()

  useMemo(() => {
    // Convert Multiple Payloads from Quadkey to GeoJson
    if (Array.isArray(payloads)) {
      if ((payloads)?.filter(exists).length > 0) {
        const mappedFeatures = payloads?.map(payload => payload?.result.map(quadKeyToFeature))

        setMultipleFeatureSets(mappedFeatures.map(features => features?.map(setDensity) ?? []))
      } else {
        setError(new Error('Cannot find payloads for provided hashes'))
      }
    }

    // Convert Single Payload from Quadkey to GeoJson
    if (payloads && (payloads as NetworkLocationHeatmapQuadkeyAnswerPayload).result) {
      const singlePayload = payloads as NetworkLocationHeatmapQuadkeyAnswerPayload
      const mappedFeatures = singlePayload.result.map(quadKeyToFeature)

      setFeatures(mappedFeatures.map(setDensity))
    }
  }, [payloads])

  return {
    error, features, multipleFeatureSets,
  }
}

export { useQuadKeyPayloadsToFeatures }
