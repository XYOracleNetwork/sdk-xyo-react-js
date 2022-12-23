import { XyoPayload } from '@xyo-network/payload-model'
import { createPayloadRenderPlugin, XyoPayloadRenderPlugin } from '@xyo-network/react-payload-plugin'
import { XyoSchemaSchema } from '@xyo-network/schema-payload-plugin'

import { DetailsBox } from './Details'

export const SchemaRenderPlugin: XyoPayloadRenderPlugin = createPayloadRenderPlugin({
  canRender: (payload?: XyoPayload) => payload?.schema === XyoSchemaSchema,
  components: {
    box: {
      details: DetailsBox,
    },
  },
  name: 'Schema',
})
