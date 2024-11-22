import { GeographicCoordinateSystemLocationSchema } from '@xyo-network/location-payload-plugin'

export const gcsLocationPayload = {
  accuracy: 58,
  latitude: 39.744_812_660_58,
  longitude: -85.988_026_747_375_84,
  quadkey: '03201023331323303120132301221220',
  schema: GeographicCoordinateSystemLocationSchema,
  time: 1_670_428_239_288,
}

export const currentLocationPayload = {
  schema: 'network.xyo.location',
  currentLocation: {
    coords: {
      accuracy: 600,
      altitude: 0,
      heading: 0,
      latitude: 37.422_093_6,
      longitude: -122.083_922,
      speed: 0,
    },
    timestamp: 1_732_309_618_779,
  },
}
