import { Payload } from '@xyo-network/payload-model'
import { createPayloadRenderPlugin, PayloadRenderPlugin } from '@xyo-network/react-payload-plugin'

import { DetailsBox } from './Details'

export const PointerRenderPlugin: PayloadRenderPlugin = createPayloadRenderPlugin({
  canRender: (payload?: Payload) => payload?.schema === 'network.xyo.pointer',
  components: {
    box: {
      details: DetailsBox,
    },
  },
  name: 'Pointer',
})
