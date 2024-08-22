import type { PayloadRenderPlugin } from '@xyo-network/react-payload-plugin'
import { createPayloadRenderPlugin } from '@xyo-network/react-payload-plugin'

import { DetailsRenderer } from './components/index.ts'

/** @deprecated use from @xyo-network/react-default-plugin instead */
export const DetailsRenderPlugin: PayloadRenderPlugin = {
  ...createPayloadRenderPlugin({
    canRender: () => true,
    components: { box: { details: DetailsRenderer } },
    name: 'Details',
  }),
}
