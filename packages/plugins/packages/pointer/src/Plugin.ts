import type { Payload } from '@xyo-network/payload-model'
import type { PayloadRenderPlugin } from '@xyo-network/react-payload-plugin'
import { createPayloadRenderPlugin } from '@xyo-network/react-payload-plugin'

import { DetailsBox } from './Details.tsx'

export const PointerRenderPlugin: PayloadRenderPlugin = createPayloadRenderPlugin({
  canRender: (payload?: Payload) => payload?.schema === 'network.xyo.pointer',
  components: { box: { details: DetailsBox } },
  name: 'Pointer',
})
