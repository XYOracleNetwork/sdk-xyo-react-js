import { Payload } from '@xyo-network/payload-model'
import { createPayloadRenderPlugin, PayloadRenderPlugin } from '@xyo-network/react-payload-plugin'
import { XyoSchemaSchema } from '@xyo-network/schema-payload-plugin'

import { DetailsBox } from './Details'

export const SchemaRenderPlugin: PayloadRenderPlugin = createPayloadRenderPlugin({
  canRender: (payload?: Payload) => payload?.schema === XyoSchemaSchema,
  components: {
    box: {
      details: DetailsBox,
    },
  },
  name: 'Schema',
})
