import { GeoJson } from '@xyo-network/sdk-geo'
import { Feature, Geometry } from 'geojson'

import { NetworkElevationQuadkeyAnswerPayload } from '../types.js'
import { LatLngBase, LocationElevation, OpenElevationApiClient } from './OpenElevation/index.js'

export interface ElevationPayloadProcessorConfig {
  lookupLocations: OpenElevationApiClient['lookupPost']
  payload: NetworkElevationQuadkeyAnswerPayload
}

export class ElevationPayloadProcessor {
  private config: ElevationPayloadProcessorConfig
  private features: Feature<Geometry>[] = []
  private locations: LatLngBase[] = []

  constructor(config: ElevationPayloadProcessorConfig) {
    this.config = config
  }

  async buildElevations() {
    if (this.locations.length === 0) {
      console.warn('Cannot build elevations without locations.  Did you call buildFeatures?')
    }
    try {
      const locationElevations = (await this.config.lookupLocations?.({ locations: this.locations }))?.results
      const featuresWithElevations = this.features.map((feature, index) => this.featuresWithElevationsIterator(feature, index, locationElevations))
      return featuresWithElevations
    } catch {
      console.error('Error fetching elevation data')
    }
  }

  buildFeatures() {
    this.features = this.config.payload.result.map((location) => this.featuresIterator(location))
    return this
  }

  private featuresIterator = ({ quadkey, elevation }: { elevation: number; quadkey: string }) => {
    // elevation at center of the quadkey
    const geojson = new GeoJson(quadkey)

    const { lat, lng } = geojson.center()
    this.locations.push({ latitude: lat, longitude: lng })

    const polygonFeature = new GeoJson(quadkey).polygonFeature()
    polygonFeature.properties = {
      elevation,
    }
    return polygonFeature
  }

  private featuresWithElevationsIterator = (feature: Feature, index: number, locationElevations?: LocationElevation[]) => {
    if (feature.properties) {
      feature.properties.quadkeyElevation = locationElevations?.[index]?.elevation
      const { quadkeyElevation, elevation } = feature.properties
      feature.properties.variance = quadkeyElevation - elevation
    }
    return feature
  }
}
