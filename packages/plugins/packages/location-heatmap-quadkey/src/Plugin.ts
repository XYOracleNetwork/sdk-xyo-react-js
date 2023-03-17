import { Payload } from '@xyo-network/payload-model'
import { createPayloadRenderPlugin, PayloadRenderPlugin } from '@xyo-network/react-payload-plugin'

import { QuadkeyHeatMapWithSettingsRenderer } from './components'

export const QuadkeyHeatMapRenderPlugin: PayloadRenderPlugin = createPayloadRenderPlugin({
  canRender: (payload?: Payload) => payload?.schema === 'network.xyo.location.heatmap.quadkey.answer',
  components: {
    box: {
      details: QuadkeyHeatMapWithSettingsRenderer,
    },
  },
  name: 'Heat Map',
})
