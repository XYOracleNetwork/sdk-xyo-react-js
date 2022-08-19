import { createPayloadRenderPlugin, XyoPayloadRenderPlugin } from '@xyo-network/react-payload-plugin'

import { PayloadDetailsRender } from './components'

export const DetailsRenderPlugin: XyoPayloadRenderPlugin = {
  ...createPayloadRenderPlugin({
    canRender: () => true,
    components: {
      box: {
        details: PayloadDetailsRender,
      },
    },
    name: 'Details',
  }),
}
