import { Payload } from '@xyo-network/payload-model'
import { createPayloadRenderPlugin, PayloadRenderPlugin } from '@xyo-network/react-payload-plugin'
import { SchemaSchema } from '@xyo-network/schema-payload-plugin'

import { DetailsBox } from './Details.js'

export const SchemaRenderPlugin: PayloadRenderPlugin = createPayloadRenderPlugin({
  canRender: (payload?: Payload) => payload?.schema === SchemaSchema,
  components: {
    box: {
      details: DetailsBox,
    },
  },
  name: 'Schema',
})
