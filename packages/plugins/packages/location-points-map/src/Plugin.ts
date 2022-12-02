import { XyoPayload } from '@xyo-network/payload'
import { createPayloadRenderPlugin, XyoPayloadRenderPlugin } from '@xyo-network/react-payload-plugin'

import { PointsMapWithSettingsRenderer } from './components'

export const PointsMapRenderPlugin: XyoPayloadRenderPlugin = {
  ...createPayloadRenderPlugin({
    canRender: (payload?: XyoPayload) => payload?.schema === 'network.xyo.location.range.answer',
    components: {
      box: {
        detailsBox: PointsMapWithSettingsRenderer,
      },
    },
    name: 'Points Map',
  }),
}
