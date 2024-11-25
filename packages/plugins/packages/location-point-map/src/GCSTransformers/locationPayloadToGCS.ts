import type { LocationWitnessPayload } from '@xyo-network/api'
import type { GeographicCoordinateSystemLocationPayload } from '@xyo-network/location-payload-plugin'
import { GeographicCoordinateSystemLocationSchema } from '@xyo-network/location-payload-plugin'
import type { Payload } from '@xyo-network/payload-model'

import { currentLocationToGCS } from './transformers/index.ts'

const validSchemas = {
  currentLocation: 'network.xyo.location.current',
  gcsLocation: GeographicCoordinateSystemLocationSchema,
}

export const locationPayloadToGCS = (location: Payload) => {
  switch (location.schema) {
    case validSchemas.currentLocation: {
      return currentLocationToGCS(location as LocationWitnessPayload)
    }
    case validSchemas.gcsLocation: {
      return location as GeographicCoordinateSystemLocationPayload
    }
    default: {
      throw new Error(`Unknown location schema: ${location.schema}`)
    }
  }
}
