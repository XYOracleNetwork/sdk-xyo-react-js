import { XyoPayload } from '@xyo-network/payload-model'
import { createPayloadRenderPlugin, XyoPayloadRenderPlugin } from '@xyo-network/react-payload-plugin'

import { DetailsBox } from './Details'

export const PointerRenderPlugin: XyoPayloadRenderPlugin = createPayloadRenderPlugin({
  canRender: (payload?: XyoPayload) => payload?.schema === 'network.xyo.pointer',
  components: {
    box: {
      details: DetailsBox,
    },
  },
  name: 'Pointer',
})
