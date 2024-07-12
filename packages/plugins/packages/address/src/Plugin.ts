import { createPayloadRenderPlugin, PayloadRenderPlugin } from '@xyo-network/react-payload-plugin'

import { AddressMenuItemRenderer } from './components/index.js'

export const AddressRenderPlugin: PayloadRenderPlugin = {
  ...createPayloadRenderPlugin({
    canRender: () => true,
    components: {
      menu: {
        item: AddressMenuItemRenderer,
      },
    },
    name: 'Address',
  }),
}
