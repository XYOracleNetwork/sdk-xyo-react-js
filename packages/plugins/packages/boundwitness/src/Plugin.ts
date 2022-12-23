import { XyoPayload } from '@xyo-network/payload-model'
import { createPayloadRenderPlugin, XyoPayloadRenderPlugin } from '@xyo-network/react-payload-plugin'

import { BoundWitnessCardContent, BoundWitnessCardHeader, BoundWitnessDetailsBox } from './components'

export const BoundWitnessRenderPlugin: XyoPayloadRenderPlugin = {
  ...createPayloadRenderPlugin({
    canRender: (payload?: XyoPayload) => payload?.schema === 'network.xyo.boundwitness',
    components: {
      box: {
        detailsBox: BoundWitnessDetailsBox,
      },
      card: {
        content: BoundWitnessCardContent,
        header: BoundWitnessCardHeader,
      },
    },
    name: 'BoundWitness',
  }),
}
