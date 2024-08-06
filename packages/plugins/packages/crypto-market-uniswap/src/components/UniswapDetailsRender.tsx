import { FlexBoxProps } from '@xylabs/react-flexbox'
import { PayloadDetailsRenderProps } from '@xyo-network/react-payload-plugin'
import { PayloadDataMissing } from '@xyo-network/react-shared'
import { UniswapCryptoMarketPayload } from '@xyo-network/uniswap-crypto-market-payload-plugin'

import { UniswapPairsCardView } from './Cards/index.js'
import { UniswapPairsTableView } from './Table/index.js'

export const UniswapDetailsRender: React.FC<PayloadDetailsRenderProps & FlexBoxProps> = ({ listMode, ...props }) => {
  const { payload } = props
  const uniswapPayload = payload ? (payload as UniswapCryptoMarketPayload) : undefined

  if (uniswapPayload?.pairs.length === 0) {
    return <PayloadDataMissing alertBody="Payload is missing valid Uniswap Pairs." />
  }

  return (
    <>
      {listMode === 'table'
        ? <UniswapPairsTableView {...props} />
        : <UniswapPairsCardView {...props} />}
    </>
  )
}
