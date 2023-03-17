import { createPayloadRenderPlugin, PayloadRenderPlugin } from '@xyo-network/react-payload-plugin'

import { DetailsRenderer } from './components'

export const DefaultRenderPlugin: PayloadRenderPlugin = {
  ...createPayloadRenderPlugin({
    canRender: () => true,
    components: {
      box: {
        detailsBox: DetailsRenderer,
      },
    },
    name: 'Default',
  }),
}
