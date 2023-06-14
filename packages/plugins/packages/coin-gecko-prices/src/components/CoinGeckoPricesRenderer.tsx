import { CoingeckoCryptoMarketPayload } from '@xyo-network/coingecko-crypto-market-payload-plugin'
import { Payload } from '@xyo-network/payload-model'
import { CryptoAssetRenderer } from '@xyo-network/react-aggregate-price-plugin'
import { PayloadDetailsRenderProps } from '@xyo-network/react-payload-plugin'
import { PayloadDataMissing } from '@xyo-network/react-shared'
import isEmpty from 'lodash/isEmpty'

import { useCoinGeckoToAssetPriceDiviner } from '../hooks'

export interface CoinGeckoPricesRendererProps extends PayloadDetailsRenderProps {
  payload?: Payload
}

export const CoinGeckoPricesRenderer: React.FC<CoinGeckoPricesRendererProps> = ({ payload, ...props }) => {
  const coinGeckoPricesPayload = payload ? (payload as CoingeckoCryptoMarketPayload) : undefined

  const mappedCoinGeckoPricesPayload = useCoinGeckoToAssetPriceDiviner(coinGeckoPricesPayload)

  if (isEmpty(coinGeckoPricesPayload?.assets)) {
    return <PayloadDataMissing alertBody="Payload is missing valid asset prices" />
  }

  return <CryptoAssetRenderer payload={mappedCoinGeckoPricesPayload} {...props} />
}
