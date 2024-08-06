import { LocationSchema } from '@xyo-network/location-payload-plugin'
import { Payload } from '@xyo-network/payload-model'
import { createPayloadRenderPlugin, PayloadRenderPlugin } from '@xyo-network/react-payload-plugin'

import { PointMapWithSettingsRenderer } from './components/index.ts'

export const PointMapRenderPlugin: PayloadRenderPlugin = {
  ...createPayloadRenderPlugin({
    canRender: (payload?: Payload) => payload?.schema === LocationSchema,
    components: {
      box: {
        detailsBox: PointMapWithSettingsRenderer,
      },
    },
    name: 'Point Map',
  }),
}
