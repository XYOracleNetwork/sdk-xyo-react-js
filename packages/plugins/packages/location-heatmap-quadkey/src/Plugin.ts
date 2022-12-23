import { XyoPayload } from '@xyo-network/payload-model'
import { createPayloadRenderPlugin, XyoPayloadRenderPlugin } from '@xyo-network/react-payload-plugin'

import { QuadkeyHeatMapWithSettingsRenderer } from './components'

export const QuadkeyHeatMapRenderPlugin: XyoPayloadRenderPlugin = createPayloadRenderPlugin({
  canRender: (payload?: XyoPayload) => payload?.schema === 'network.xyo.location.heatmap.quadkey.answer',
  components: {
    box: {
      details: QuadkeyHeatMapWithSettingsRenderer,
    },
  },
  name: 'Heat Map',
})
