import { FlexBoxProps } from '@xylabs/react-flexbox'
import { XyoPayloadDetailsRenderProps } from '@xyo-network/react-payload-plugin'
import { PayloadDataMissing } from '@xyo-network/react-shared'
import { XyoUniswapCryptoMarketPayload } from '@xyo-network/uniswap-crypto-market-payload-plugin'

import { UniswapPairsCardView } from './Cards'
import { UniswapPairsTableView } from './Table'

export const UniswapDetailsRender: React.FC<XyoPayloadDetailsRenderProps & FlexBoxProps> = ({ listMode, ...props }) => {
  const { payload } = props
  const uniswapPayload = payload ? (payload as XyoUniswapCryptoMarketPayload) : undefined

  if (uniswapPayload?.pairs.length === 0) {
    return <PayloadDataMissing alertBody="Payload is missing valid Uniswap Pairs." />
  }

  if (listMode === 'table') {
    return <UniswapPairsTableView {...props} />
  } else {
    return <UniswapPairsCardView {...props} />
  }
}
