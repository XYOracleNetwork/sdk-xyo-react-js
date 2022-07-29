import { XyoPayload } from '@xyo-network/payload'
import { createPayloadRenderPlugin, XyoPayloadRenderPlugin } from '@xyo-network/react-payload-plugin'

import { PayloadQuadKeyHeatMapWithSettings } from './components'

export const RenderPlugin: XyoPayloadRenderPlugin = createPayloadRenderPlugin({
  canRender: (payload?: XyoPayload) => payload?.schema === 'network.xyo.location.heatmap.quadkey.answer',
  components: {
    box: {
      details: PayloadQuadKeyHeatMapWithSettings,
    },
  },
  name: 'Heat Map',
})
