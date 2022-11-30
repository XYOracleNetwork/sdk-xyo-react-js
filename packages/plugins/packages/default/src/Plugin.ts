import { createPayloadRenderPlugin, XyoPayloadRenderPlugin } from '@xyo-network/react-payload-plugin'

import { DetailsRenderer } from './components'

export const DefaultRenderPlugin: XyoPayloadRenderPlugin = {
  ...createPayloadRenderPlugin({
    canRender: () => true,
    components: {
      box: {
        details: DetailsRenderer,
      },
    },
    name: 'Default',
  }),
}
