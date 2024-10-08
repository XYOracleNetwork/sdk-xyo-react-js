import type { Payload } from '@xyo-network/payload-model'
import type { PayloadRenderPlugin } from '@xyo-network/react-payload-plugin'
import { createPayloadRenderPlugin } from '@xyo-network/react-payload-plugin'

import { PointsMapWithSettingsRenderer } from './components/index.ts'

export const PointsMapRenderPlugin: PayloadRenderPlugin = {
  ...createPayloadRenderPlugin({
    canRender: (payload?: Payload) => payload?.schema === 'network.xyo.location.range.answer',
    components: { box: { detailsBox: PointsMapWithSettingsRenderer } },
    name: 'Points Map',
  }),
}
