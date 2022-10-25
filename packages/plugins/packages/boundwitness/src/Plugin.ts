import { XyoPayload } from '@xyo-network/payload'
import { createPayloadRenderPlugin, XyoPayloadRenderPlugin } from '@xyo-network/react-payload-plugin'

import { BoundWitnessDetails } from './components'

export const BoundWitnessRenderPlugin: XyoPayloadRenderPlugin = {
  ...createPayloadRenderPlugin({
    canRender: (payload?: XyoPayload) => payload?.schema === 'network.xyo.boundwitness',
    components: {
      box: {
        details: BoundWitnessDetails,
      },
    },
    name: 'BoundWitness',
  }),
}
