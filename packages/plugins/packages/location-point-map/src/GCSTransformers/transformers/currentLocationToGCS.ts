import type { LocationWitnessPayload } from '@xyo-network/api'
import { type GeographicCoordinateSystemLocation } from '@xyo-network/location-payload-plugin'

export const currentLocationToGCS = (location: LocationWitnessPayload): GeographicCoordinateSystemLocation => {
  return {
    latitude: location.currentLocation.coords.latitude,
    longitude: location.currentLocation.coords.longitude,
    altitude: location.currentLocation.coords.altitude ?? undefined,
    altitudeAccuracy: location.currentLocation.coords.altitudeAccuracy ?? undefined,
    accuracy: location.currentLocation.coords.accuracy ?? undefined,
  }
}
