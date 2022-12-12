import { LocationSchema } from '@xyo-network/location-payload-plugin'
import { XyoPayload } from '@xyo-network/payload'
import { createPayloadRenderPlugin, XyoPayloadRenderPlugin } from '@xyo-network/react-payload-plugin'

import { PointMapWithSettingsRenderer } from './components'

export const PointMapRenderPlugin: XyoPayloadRenderPlugin = {
  ...createPayloadRenderPlugin({
    canRender: (payload?: XyoPayload) => payload?.schema === LocationSchema,
    components: {
      box: {
        detailsBox: PointMapWithSettingsRenderer,
      },
    },
    name: 'Point Map',
  }),
}
