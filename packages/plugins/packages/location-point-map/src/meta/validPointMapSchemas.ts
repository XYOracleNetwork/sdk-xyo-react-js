import { CurrentLocationSchema, GeographicCoordinateSystemLocationSchema } from '@xyo-network/location-payload-plugin'

export const validPointMapSchemas = new Set<string>([CurrentLocationSchema, GeographicCoordinateSystemLocationSchema])
