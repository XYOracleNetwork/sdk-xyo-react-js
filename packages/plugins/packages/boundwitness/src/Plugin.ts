import { XyoPayload } from '@xyo-network/payload'
import { createPayloadRenderPlugin, XyoPayloadRenderPlugin } from '@xyo-network/react-payload-plugin'

import { BoundWitnessCardContent, BoundWitnessDetailsBox } from './components'
import { BoundWitnessCardHeader } from './components/_shared'

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
