import type { Payload } from '@xyo-network/payload-model'
import type { PayloadRenderPlugin } from '@xyo-network/react-payload-plugin'
import { createPayloadRenderPlugin } from '@xyo-network/react-payload-plugin'

import { QuadkeyHeatMapWithSettingsRenderer } from './components/index.ts'

export const QuadkeyHeatMapRenderPlugin: PayloadRenderPlugin = createPayloadRenderPlugin({
  canRender: (payload?: Payload) => payload?.schema === 'network.xyo.location.heatmap.quadkey.answer',
  components: {
    box: {
      details: QuadkeyHeatMapWithSettingsRenderer,
    },
  },
  name: 'Heat Map',
})
