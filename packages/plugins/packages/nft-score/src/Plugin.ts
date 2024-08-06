import { NftScoreSchema } from '@xyo-network/crypto-nft-payload-plugin'
import { Payload } from '@xyo-network/payload-model'
import { createPayloadRenderPlugin } from '@xyo-network/react-payload-plugin'

import { NftScoreRenderer } from './components/index.ts'

export const NftScoreRenderPlugin = {
  ...createPayloadRenderPlugin({
    canRender: (payload?: Payload) => payload?.schema === NftScoreSchema,
    components: {
      box: {
        detailsBox: NftScoreRenderer,
      },
    },
    name: 'NFT Score',
  }),
}
