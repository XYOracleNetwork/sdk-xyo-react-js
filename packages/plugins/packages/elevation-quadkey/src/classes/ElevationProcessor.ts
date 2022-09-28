import { GeoJson } from '@xyo-network/sdk-geo'
import { Feature, Geometry } from 'geojson'

import { NetworkElevationQuadkeyAnswerPayload } from '../types'
import { LatLngBase, LocationElevation, OpenElevationApiClient } from './OpenElevation'

export interface ElevationPayloadProcessorConfig {
  payload: NetworkElevationQuadkeyAnswerPayload
  lookupLocations: OpenElevationApiClient['lookupPost']
}

export class ElevationPayloadProcessor {
  private features: Feature<Geometry>[] = []
  private locations: LatLngBase[] = []
  private config: ElevationPayloadProcessorConfig

  constructor(config: ElevationPayloadProcessorConfig) {
    this.config = config
  }

  buildFeatures() {
    this.features = this.config.payload.result.map((location) => this.featuresIterator(location))
    return this
  }

  async buildElevations() {
    if (!this.locations.length) {
      console.warn('Cannot build elevations without locations.  Did you call buildFeatures?')
    }
    try {
      const locationElevations = (await this.config.lookupLocations?.({ locations: this.locations }))?.results
      const featuresWithElevations = this.features.map((feature, index) => this.featuresWithElevationsIterator(feature, index, locationElevations))
      return featuresWithElevations
    } catch (e) {
      console.error('Error fetching elevation data')
    }
  }

  private featuresIterator = ({ quadkey, elevation }: { quadkey: string; elevation: number }) => {
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
