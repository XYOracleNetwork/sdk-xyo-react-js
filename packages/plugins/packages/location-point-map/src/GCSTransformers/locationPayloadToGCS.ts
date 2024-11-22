import type { LocationWitnessPayload } from '@xyo-network/api'
import { LocationWitnessSchema } from '@xyo-network/api'
import type { GeographicCoordinateSystemLocationPayload } from '@xyo-network/location-payload-plugin'
import { GeographicCoordinateSystemLocationSchema } from '@xyo-network/location-payload-plugin'
import type { Payload } from '@xyo-network/payload-model'

import { currentLocationToGCS } from './transformers/index.ts'

export const locationPayloadToGCS = (location: Payload) => {
  switch (location.schema) {
    case LocationWitnessSchema: {
      return currentLocationToGCS(location as LocationWitnessPayload)
    }
    case GeographicCoordinateSystemLocationSchema: {
      return location as GeographicCoordinateSystemLocationPayload
    }
    default: {
      throw new Error(`Unknown location schema: ${location.schema}`)
    }
  }
}
