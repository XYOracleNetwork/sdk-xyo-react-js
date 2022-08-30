import { createPayloadRenderPlugin, XyoPayloadRenderPlugin } from '@xyo-network/react-payload-plugin'

import { DetailsRenderer } from './components'

export const DetailsRenderPlugin: XyoPayloadRenderPlugin = {
  ...createPayloadRenderPlugin({
    canRender: () => true,
    components: {
      box: {
        details: DetailsRenderer,
      },
    },
    name: 'Details',
  }),
}
