import { GeographicCoordinateSystemLocationSchema, LocationSchema } from '@xyo-network/location-payload-plugin'
import type { Payload } from '@xyo-network/payload-model'
import type { PayloadRenderPluginBase } from '@xyo-network/react-payload-plugin'

const validSchemas: Set<string> = new Set([LocationSchema, GeographicCoordinateSystemLocationSchema])

const PointMapRenderPluginMeta: PayloadRenderPluginBase = {
  canRender: (payload?: Payload) => !!(payload && validSchemas.has(payload.schema)),
  name: 'Point Map',
}

export default PointMapRenderPluginMeta
