import { Payload } from '@xyo-network/payload-model'
import { createPayloadRenderPlugin, PayloadRenderPlugin } from '@xyo-network/react-payload-plugin'

import { PointsMapWithSettingsRenderer } from './components/index.js'

export const PointsMapRenderPlugin: PayloadRenderPlugin = {
  ...createPayloadRenderPlugin({
    canRender: (payload?: Payload) => payload?.schema === 'network.xyo.location.range.answer',
    components: {
      box: {
        detailsBox: PointsMapWithSettingsRenderer,
      },
    },
    name: 'Points Map',
  }),
}
