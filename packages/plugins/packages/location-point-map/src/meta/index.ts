import { LocationSchema } from '@xyo-network/location-payload-plugin'
import type { Payload } from '@xyo-network/payload-model'
import type { PayloadRenderPluginBase } from '@xyo-network/react-payload-plugin'

const PointMapRenderPluginMeta: PayloadRenderPluginBase = {
  canRender: (payload?: Payload) => payload?.schema === LocationSchema,
  name: 'Point Map',
}

export default PointMapRenderPluginMeta
