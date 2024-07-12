/* eslint-disable deprecation/deprecation */
/* eslint-disable import/no-deprecated */
import { createPayloadRenderPlugin, PayloadRenderPlugin } from '@xyo-network/react-payload-plugin'

import { DetailsRenderer } from './components/index.js'

/** @deprecated use from @xyo-network/react-default-plugin instead */
export const DetailsRenderPlugin: PayloadRenderPlugin = {
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
