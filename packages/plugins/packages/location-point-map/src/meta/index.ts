import type { Payload } from '@xyo-network/payload-model'
import type { PayloadRenderPluginBase } from '@xyo-network/react-payload-plugin'

import { validPointMapSchemas } from './validPointMapSchemas.ts'

const PointMapRenderPluginMeta: PayloadRenderPluginBase = {
  canRender: (payload?: Payload) => !!(payload && validPointMapSchemas.has(payload.schema)),
  name: 'Point Map',
}

export default PointMapRenderPluginMeta
