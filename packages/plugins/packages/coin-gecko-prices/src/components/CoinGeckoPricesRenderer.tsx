import { XyoCoingeckoCryptoMarketPayload } from '@xyo-network/coingecko-crypto-market-payload-plugin'
import { XyoPayload } from '@xyo-network/payload-model'
import { CryptoAssetRenderer } from '@xyo-network/react-aggregate-price-plugin'
import { XyoPayloadDetailsRenderProps } from '@xyo-network/react-payload-plugin'
import { PayloadDataMissing } from '@xyo-network/react-shared'
import isEmpty from 'lodash/isEmpty'

import { useCoinGeckoToAssetPriceDiviner } from '../hooks'

export interface CoinGeckoPricesRendererProps extends XyoPayloadDetailsRenderProps {
  payload?: XyoPayload
}

export const CoinGeckoPricesRenderer: React.FC<CoinGeckoPricesRendererProps> = ({ payload, ...props }) => {
  const coinGeckoPricesPayload = payload ? (payload as XyoCoingeckoCryptoMarketPayload) : undefined

  const mappedCoinGeckoPricesPayload = useCoinGeckoToAssetPriceDiviner(coinGeckoPricesPayload)

  if (isEmpty(coinGeckoPricesPayload?.assets)) {
    return <PayloadDataMissing alertBody="Payload is missing valid asset prices" />
  }

  return <CryptoAssetRenderer payload={mappedCoinGeckoPricesPayload} {...props} />
}
